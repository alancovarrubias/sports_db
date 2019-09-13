module Database
  module PlayerBuilder
    include BasketballReference
    extend self
    ROW_SIZE = 8
    def run(season, teams)
      puts "Build Season #{season.year} Players"
      players = team_data(season, teams).map { |data| Player.find_or_create_by(data) }
    end

    private
      def team_data(season, teams)
        teams.map do |team|
          rows = basketball_data("/teams/#{team.abbr}/#{season.year}.html", "#roster td").each_slice(ROW_SIZE)
          rows.map { |row| player_attr(row[0]).merge({season: season, team: team}) }
        end.flatten(1)
      end
  end
end
