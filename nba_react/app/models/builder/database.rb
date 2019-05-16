module Builder
  class Database
    attr_reader :year, :season, :teams, :players, :games
    include BasketballReference
    def initialize(year)
      @year = year
      @season = ::Season.find_by_year(year)
      if @season
        @teams = @season.teams
        @players = @season.players
        @games = @season.games.where("date < ?", Date.yesterday)
      end
    end

    def build
      build_seasons
      build_teams
      build_players
      build_games
      build_game_stats
      build_quarter_stats
=begin
      build_ratings
      build_bets
      build_lines
=end
    end

    def daily_update
      build_ratings
      build_game_stats
      build_quarter_stats
      build_ratings
      build_bets
      build_lines
    end

    def build_seasons
      Builder::Season::Builder.run(year)
      @season = ::Season.find_by_year(year)
    end

    def build_teams
      Builder::Team::Builder.run(season)
      @teams = @season.teams
    end

    def build_players
      Builder::Player::Builder.run(season, teams)
      @players = @season.players
    end

    def build_games
      Builder::Game::Builder.run(season, teams)
      @games = @season.games
    end

    def build_game_stats(games=nil)
      games = games ? games : @games
      Builder::Game::Stats.build(@season, games.select { |game| game.period_stats.size == 0 })
    end

    def build_quarter_stats(games=nil)
      games = games ? games : @games
      Builder::Quarter::Stats.build(@season, games.select { |game| game.period_stats(4).size == 0 })
    end

    def build_ratings
      loop do
        stats = ::Stat.where(season: @season, calc: false).limit(100)
        break if stats.empty?
        Builder::Stats::Ratings.run(stats)
      end
=begin
      loop do
        team_stats = ::Stat.where("season_id = #{@season.id} AND model_type = 'Team' AND drtg_diff = 0.0").limit(100)
        Builder::Stats::DrtgDiff.run(team_stats, 0)
      end
=end
    end

    def build_bets(games=nil)
      @games = games ? games : @games
      Builder::Bet::Builder.run(@games.select { |game| game.bets.size != 5 })
    end
    
    def build_lines(games=nil)
      dates = games ? games.map(&:date).uniq : @games.map(&:date).uniq
      Lines::Builder.run(season, @games, dates)
    end
  end
end
