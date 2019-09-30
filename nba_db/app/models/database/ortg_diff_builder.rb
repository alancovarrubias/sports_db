module Database
  class OrtgDiffBuilder
    def initialize(season, games_back)
      @season = season
      @teams = season.teams
      @games = season.games.order(id: :asc)
      @games_back = games_back
      @period_team_stat_store = Hash[PERIODS.map { |period| [period, Hash[@season.teams.map { |team| [team, { prev_games: [], season: nil, games_back: nil }] }] ] }]
      @teams_based = { season: Set.new, games_back: Set.new }
    end

    def run
      @games.each do |game|
        puts "Ortg Diff Calc #{game.id}"
        PERIODS.each do |period|
          team_stat_store = @period_team_stat_store[period]
          [:away, :home].each do |field|
            team = game.send("#{field}_team")
            stat_store = team_stat_store[team]
            [:games_back, :season].each do |type|
              attributes = type == :games_back ? { games_back: @games_back, period: period } : { period: period }
              prev_games = type == :games_back ? stat_store[:prev_games][-@games_back..-1] : stat_store[:prev_games]
              stat = game.send("#{type}_#{field}_team_stat", attributes)
              if stat && stat.opp_team_stat
                if @teams_based[type].size == @teams.size # do all teams have a base
                  ortg_diff = 0
                  prev_games.each do |prev_game|
                    opp_team = prev_game.away_team == team ? prev_game.home_team : prev_game.away_team
                    opp_store = team_stat_store[opp_team]
                    base_stat = opp_store[type]
                    opp_stat = game.away_team == team ? prev_game.game_home_team_stat(period: period, games_back: @games_back) : prev_game.game_away_team_stat(period: period, games_back: @games_back)
                    ortg_diff += base_stat.ortg - opp_stat.ortg
                  end
                  ortg_diff = ortg_diff / prev_games.size
                  stat.update(ortg_diff: ortg_diff)
                end
                stat_store[type] = stat
                @teams_based[type] << team # used to check if each team has a base set
              end
            end
            stat_store[:prev_games] << game
          end
        end
      end
    end
  end
end
