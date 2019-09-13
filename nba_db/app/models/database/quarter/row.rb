module Database
  module Quarter
    class Row
      attr_reader :time, :text, :play_type, :player1, :player2, :stat1, :stat2, :is_home, :is_away, :same_team
      def initialize(row)
        @time = text_to_time(row[0].text)
        if row.length == 2
          play = row[1]
        elsif row.length == 6
          @is_away = away_text_exists?(row)
          @is_home = !@is_away
          play = @is_away ? row[1] : row[5]
          @player1, @player2 = parse_players(play)
        end
        @text = play.text
        play = Play.new(@text, @player2)
        @stat1 = play.stat1
        @stat2 = play.stat2
        @play_type = play.type
        @same_team = play.same_team
      end

      private
        def text_to_time(text)
          minutes, seconds = text.split(':').map(&:to_i)
          return minutes*60 + seconds
        end

        def away_text_exists?(row)
          row[1].text.scrub('').gsub(/\A\p{Space}*/, '').length != 0
        end

        def parse_players(play)
          player_hrefs = play.children.select { |child| child.class == Nokogiri::XML::Element }.map {|player| player.attributes['href'].value }
          return player_hrefs.map { |string| string[string.rindex('/')+1...string.index('.')] }
        end
    end
  end
end
