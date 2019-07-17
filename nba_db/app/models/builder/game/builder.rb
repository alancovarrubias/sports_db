module Builder
  module Game
    module Builder
      extend self
      extend BasketballReference
      ROW_SIZE = 4
      def run(season, teams)
        game_data(season, teams).each do |data|
          ::Game.find_or_create_by(data)
        end
      end

      private
        def game_data(season, teams)
          months = [10, 11, 12, 1, 2, 3, 4].map {|num| Date::MONTHNAMES[num].downcase}
          month_data = months.map { |month| basketball_data("/leagues/NBA_#{season.year}_games-#{month}.html", ".left") }.compact
          rows = month_data.map { |data| data.each_slice(ROW_SIZE).to_a }.flatten(1)
          rows = rows.reject { |row| header_row?(row) }
          rows.map do |row|
            date = parse_date(row)
            away_team, home_team = parse_teams(teams, row)
            {season: season, date: date, away_team: away_team, home_team: home_team}
          end
        end

        def header_row?(row)
          row[0].text == "Date" || row.length == 1
        end

        def parse_date(row)
          data_str = row[1]['csk']
          date_str = data_str[4...-3]
          year = date_str[0..3].to_i
          month = date_str[4..5].to_i
          day = date_str[6..7].to_i
          return Date.new(year, month, day)
        end

        def parse_teams(teams, row)
          data_str = row[1]['csk']
          away_abbr = data_str[0..2]
          home_abbr = data_str[-3..-1]
          away_team = teams.find_by_abbr(away_abbr)
          home_team = teams.find_by_abbr(home_abbr)
          return away_team, home_team
        end
    end
  end
end
