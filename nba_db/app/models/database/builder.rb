module Database
  class Builder
    LIMIT = nil
    def initialize(year)
      @year = year
      @season = Season.find_by_year(year)
      if @season
        @teams = @season.teams
        @players = @season.players
        @games = @season.games.where("date < ?", Date.yesterday)
      end
    end

    def run(games_back=10)
      seasons
      teams
      players
      games
      game_stats
      quarter_stats
      games_back_stats(games_back)
      bets
      lines
    end

    def daily_update
      game_stats
      quarter_stats
      ratings
      bets
      lines
    end

    def seasons
      SeasonBuilder.run(@year)
      @season = Season.find_by_year(@year)
    end

    def teams
      TeamBuilder.run(@season)
      @teams = @season.teams
    end

    def players
      PlayerBuilder.run(@season, @teams)
      @players = @season.players
    end

    def games
      GameBuilder.run(@season, @teams)
      @games = @season.games
    end

    def game_stats(games=nil)
      games = games ? games : @games
      GameStatsBuilder.run(@season, games)
    end

    def quarter_stats(games=nil)
      games = games ? games : @games
      QuarterStatsBuilder.run(@season, games)
    end

    def games_back_stats(games_back)
      GamesBackStatsBuilder.run(@season, games_back)
    end

    def bets(games=nil)
      games = games ? games : @games
      BetBuilder.run(@season, games)
    end
    
    def lines(games=nil)
      games = games ? games : @games
      LineBuilder.run(@season, games)
    end
  end
end
