module Database
  module Stats
    class Store
      include StatHelper
      def initialize(initial_stat, games_back_length)
        @store = {}
        @initial_stat = initial_stat
        @games_back_length = games_back_length
      end

      def init_key(key)
        @store[key] = { season_stat: @initial_stat, games_back_stat: @initial_stat, games_back_list: [], season_stat_count: 0 } unless @store[key]
      end

      def season_stat(key)
        return @store[key][:season_stat]
      end

      def games_back_stat(key)
        return @store[key][:games_back_stat]
      end

      def games_back_list(key)
        return @store[key][:games_back_list]
      end

      def season_stat_count(key)
        return @store[key][:season_stat_count]
      end

      def add(key, stat)
        key_data = @store[key]
        key_data[:games_back_list] << stat
        key_data[:season_stat] = add_stat(key_data[:season_stat], stat)
        games_back_stat = add_stat(key_data[:games_back_stat], stat)
        if key_data[:games_back_list].length > @games_back_length
          games_back_stat = subtract_stat(games_back_stat, key_data[:games_back_list].first)
          key_data[:games_back_list].shift
        end
        key_data[:games_back_stat] = games_back_stat
        key_data[:season_stat_count] += 1
      end
    end
  end
end
