module Builder
  module Quarter
    class TeamStat
      include StatHelper
      DATA_ATTR = [:sp, :fgm, :fga, :thpm, :thpa, :ftm, :fta, :orb, :drb, :ast, :stl, :blk, :tov, :pf, :pts]
      def initialize(player_stats)
        @player_stats = player_stats
        @team_stat = add_stats(Stat.data_hash, player_stats.values.map(&:data_hash))
      end

      def data_hash
        return Hash[ DATA_ATTR.map { |attr| [attr, self.get_property(attr)] } ]
      end

      def get_property(name)
        prop_name = "@#{name}".to_sym
        return self.instance_variable_get(prop_name)
      end
    end
  end
end
