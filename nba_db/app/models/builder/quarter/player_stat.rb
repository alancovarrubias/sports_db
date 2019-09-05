module Builder
  module Quarter
    class PlayerStat
      UPDATE_ATTR = [:sp, :fgm, :fga, :thpm, :thpa, :ftm, :fta, :orb, :drb, :ast, :stl, :blk, :tov, :pf, :pts]
      attr_accessor :sp, :time
      def initialize(player)
        @player = player
        @time = 0
        UPDATE_ATTR.each do |attr|
          set_property(attr, 0)
        end
      end

      def attributes
        return Hash[UPDATE_ATTR.map { |attr| [attr, self.get_property(attr)] }]
      end

      def add(stat)
        stat.each do |key, value|
          set_property(key, get_property(key) + value)
        end
      end

      def get_property(name)
        prop_name = "@#{name}".to_sym
        return self.instance_variable_get(prop_name)
      end

      def set_property(name, value)
        prop_name = "@#{name}".to_sym
        self.instance_variable_set(prop_name, value)
      end
    end
  end
end
