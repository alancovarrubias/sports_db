module Builder
  module Player
    module Builder
      include BasketballReference
      extend self
      ROW_SIZE = 8
      def run(season, teams)
        players = team_data(season, teams).map do |data|
          ::Player.find_or_create_by(data)
        end
      end

      private
        def team_data(season, teams)
          teams.map do |team|
            rows = basketball_data("/teams/#{team.abbr}/#{season.year}.html", "#roster td").each_slice(ROW_SIZE)
            rows.map do |row|
              player_attr(row[0]).merge({season: season, team: team})
            end
          end.flatten(1)
        end
    end
  end
end
