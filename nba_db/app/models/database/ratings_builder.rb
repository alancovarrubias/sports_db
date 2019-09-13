module Database
  module RatingsBuilder
    extend self
    def run(stats)
      stats.each do |stat|
        puts "Stat Update #{stat.id}"
        ortg = stat.calc_ortg
        drtg = stat.calc_drtg
        poss_percent = stat.calc_poss_percent
        stat.update(ortg: ortg, drtg: drtg, poss_percent: poss_percent)
      end
    end
  end
end
