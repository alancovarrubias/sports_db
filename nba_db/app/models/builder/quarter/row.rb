module Builder
  module Quarter
    class Row
      attr_reader :time, :play, :player1, :player2, :team1, :team2
      def initialize(data, away_team, home_team)
        size = data[2].nil? || data[2].text.include?(":") ? 2 : 6
        row = data.shift(size)
        @time = parse_time(row[0])
        @team1 = row[1].text.length > 1 ? home_team : away_team
        @team2 = row[1].text.length > 1 ? away_team : home_team

        play = size == 2 ? row[1] : (row[1].text.length > 1 ? row[1] : row[5])
        @play = Play.new(play)
        @player1, @player2 = find_players(play)
      end

      def parse_time(element)
        text = element.text
        minutes, seconds = text.split(":").map(&:to_i)
        return minutes*60 + seconds
      end

      def find_players(play)
        player_hrefs = play.children.select { |child| child.class == Nokogiri::XML::Element }.map {|player| player.attributes['href'].value }
        return player_hrefs.map { |string| string[string.rindex('/')+1...string.index('.')] }
      end
    end
  end
end
