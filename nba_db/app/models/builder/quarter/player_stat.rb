module Builder
  module Quarter
    class PlayerStat
      DATA_ATTR = [:sp, :fgm, :fga, :thpm, :thpa, :ftm, :fta, :orb, :drb, :ast, :stl, :blk, :tov, :pf, :pts]
      attr_accessor :sp, :time, :starter
      def initialize(player)
        @time = 0
        @player = player
        @starter = false
        DATA_ATTR.each { |attr| set_property(attr, 0) }
      end

      def data_hash
        return Hash[ DATA_ATTR.map { |attr| [attr, self.get_property(attr)] } ]
      end

      def add(stat)
        stat.each { |key, value| { set_property(key, get_property(key) + value) }
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
