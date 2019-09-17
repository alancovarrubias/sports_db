module Database
  module GamesBack
    class Store
      def initialize(games_back)
        @store = {}
        @games_back = games_back
      end

      def init_key(key)
        @store[key] = { season_stat: Stat.new, games_back_stat: Stat.new, games_back_list: [], season_stat_count: 0 } unless @store[key]
      end

      def season_stat(key)
        return @store[key][:season_stat].data_hash
      end

      def games_back_stat(key)
        return @store[key][:games_back_stat].data_hash
      end

      def games_back_list_size(key)
        return @store[key][:games_back_list].size
      end

      def season_stat_count(key)
        return @store[key][:season_stat_count]
      end

      def add(key, stat)
        key_data = @store[key]
        key_data[:games_back_list] << stat
        key_data[:season_stat].add(stat)
        key_data[:games_back_stat].add(stat)
        if key_data[:games_back_list].length > @games_back
          key_data[:games_back_stat].subtract(key_data[:games_back_list].first)
          key_data[:games_back_list].shift
        end
        key_data[:season_stat_count] += 1
      end
    end
  end
end
