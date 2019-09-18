module Database
  module RatingsBuilder
    extend self
    def run(stats)
      stats.each do |stat|
        if stat.opp_team_stat # sometimes season_stats and games_back_stats don't have a an opp_team_stat so we can't calculate their ratings
          ortg = stat.calc_ortg
          drtg = stat.calc_drtg
          poss_percent = stat.calc_poss_percent
          stat.update(ortg: ortg, drtg: drtg, poss_percent: poss_percent)
        end
      end
    end
  end
end
