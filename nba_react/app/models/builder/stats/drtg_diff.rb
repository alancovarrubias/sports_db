module Builder
  module Stats
    module DrtgDiff
      extend self
      def build(game, period, games_back=nil)
        ["away", "home"].each do |field|
          game_stat = game.send("game_#{field}_team_stat", period)
          if games_back
            prev_stat = game.send("prev_#{field}_team_stat", games_back, period)
            team_stats = game.latest_team_prev_stats(games_back)
          elsif games_back == nil
            prev_stat = game.send("season_#{field}_team_stat", period)
            team_stats = game.latest_team_season_stats
          end
          prev_games = game.send("prev_#{field}_games").limit(games_back)
          drtg_diff = 0
          prev_games.each do |prev_game|
            opp_stat = prev_game.opp_team_stat(game.send("#{field}_team"))
            opp_team = opp_stat.team
            opp_base_stat = team_stats[opp_team]
            drtg_diff += opp_stat.ortg - opp_base_stat.ortg 
          end
          prev_stat.update(drtg_diff: drtg_diff)
        end
      end
    end
  end
end
