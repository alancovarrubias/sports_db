module Builder
  module Stats
    class Store
      include StatHelpers
      def initialize(initial_hash, games_back_size_max)
        @store = {}
        @initial_hash = initial_hash
        @games_back_size_max = games_back_size_max
      end

      def get_stat(key)
        return @store[key]
      end

      def add_stats(key, stats)
        stat_array = stats.respond_to?(:each) ? stats : [stats]
        if element = @store[key]
          last = element[:last]
          last += stat_array
          last.shift(last.size - @games_back_size_max) if last.size > @games_back_size_max

          total = element[:total]
          element[:total] = sum_stats(total, stat_array)
        else
          total = sum_stats(@initial_hash, stat_array)
          @store[key] = { last: stat_array, total: total }
        end
      end
    end
  end
end
