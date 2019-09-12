module Builder
  module Stats
    class Store
      include StatHelper
      def initialize(initial_stat, games_back_length)
        @store = {}
        @initial_stat = initial_stat
        @games_back_length = games_back_length
      end

      def season_stat(key)
        return @store[key][:season_stat]
      end

      def games_back_stat(key)
        return @store[key][:games_back_stat]
      end

      def add(key, stat)
        @store[key] = { season_stat: @initial_stat, games_back_stat: @initial_stat, stat_list: [] } unless @store[key]
        key_data = @store[key]
        key_data[:stat_list] << stat
        key_data[:season_stat] = add_stat(key_data[:season_stat], stat)
        games_back_stat = add_stat(key_data[:games_back_stat], stat)
        if key_data[:stat_list].length > @games_back_length
          games_back_stat = subtract_stat(games_back_stat, key_data[:stat_list].first)
          key_data[:stat_list].shift
        end
        key_data[:games_back_stat] = games_back_stat
      end
    end
  end
end
