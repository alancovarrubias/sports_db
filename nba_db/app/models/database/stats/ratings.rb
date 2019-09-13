module Builder
  module Stats
    module Ratings
      extend self
      def run(stats)
        # eager load constants to avoid threading bug
        if stats.respond_to?(:each)
=begin
          Stats::Player
          Stats::Team
          loop do
            stats.each_slice(5) do |slice|
              threads = []
              slice.each do |stat|
                threads << Thread.new do
                  data = {}
                  data[:ortg] = stat.calc_ortg
                  data[:drtg] = stat.calc_drtg
                  data[:poss_percent] = stat.calc_poss_percent
                  Thread.current[:output] = data
                end
              end
              stat_data = threads.map do |thread|
                thread.join
                thread[:output]
              end
              slice.zip(stat_data).each do |stat, data|
                puts "Stat Update #{stat.id}"
                stat.update(data)
              end
            end
            break if stats.size == 0
          end
=end
          stats.each do |stat|
            build_stat(stat)
          end
        else
          build_stat(stats)
        end
      end

      def build_stat(stat)
        puts "Stat Update #{stat.id}"
        ortg = stat.calc_ortg
        drtg = stat.calc_drtg
        poss_percent = stat.calc_poss_percent
        stat.update(ortg: ortg, drtg: drtg, poss_percent: poss_percent, calc: true)
      end
    end
  end
end
