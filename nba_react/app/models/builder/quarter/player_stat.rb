module Builder
  module Quarter
    class PlayerStat
      UPDATE_ATTR = [:sp, :fgm, :fga, :thpm, :thpa, :ftm, :fta, :orb, :drb, :ast, :stl, :blk, :tov, :pf, :pts]
      attr_accessor :player, :team, :idstr, :starter, :time
      attr_accessor :sp, :fgm, :fga, :thpm, :thpa, :ftm, :fta, :orb, :drb, :ast, :stl, :blk, :tov, :pf, :pts
      def initialize(season, game, player, quarter)
        @season = season
        @game = game
        @player = player
        @quarter = quarter
        @team = player.team
        @idstr = player.idstr
        @starter = false
        @time = 0
        UPDATE_ATTR.each do |attr|
          set_property(attr, 0)
        end
      end

      def save
        query = { season: @season, game: @game, model: @player, games_back: nil, season_stat: false, period: @quarter }
        stat = ::Stat.find_or_create_by(query)
        update_hash = attributes.select { |key, value| UPDATE_ATTR.include?(key) }
        stat.update(update_hash)
      end

      def set_property(name, value)
        prop_name = "@#{name}".to_sym # you need the property name, prefixed with a '@', as a symbol
        self.instance_variable_set(prop_name, value)
      end

      def attributes
        instance_variables.map do |var| 
          [var[1..-1].to_sym, instance_variable_get(var)]
        end.to_h
      end
    end
  end
end
