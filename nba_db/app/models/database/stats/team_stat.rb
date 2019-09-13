module Database
  module Stats
    class TeamStat
      include StatHelper
      attr_reader :data_hash
      def initialize(player_stats)
        @player_stats = player_stats
        @data_hash = add_stats(Stat.data_hash, player_stats.map(&:data_hash))
      end
    end
  end
end
