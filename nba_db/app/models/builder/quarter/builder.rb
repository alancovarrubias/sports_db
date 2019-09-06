module Builder
  module Quarter
    module Builder
      include BasketballReference
      extend self
      def build(season, games)
        games.each do |game|
          quarter_stats = build_quarter_stats(game)
          save_quarter_stats(season, game, quarter_stats)
        end
      end

      def build_quarter_stats(game)
        puts "Quarter Stat #{game.url} #{game.id}"
        data = basketball_data("/boxscores/pbp/#{game.url}.html", "#pbp td").to_a
        rows = parse_rows(data)
        return (1..4).map do |quarter|
          quarter_rows, rows = split_rows_to_quarter(rows)
          PlayerStats.new(quarter, quarter_rows)
        end
      end

      def save_quarter_stats(season, game, quarter_stats)
        quarter_stats.each do |stats|
          [:away_stats, :home_stats].each do |stat_type|
            stats.send(stat_type).each do |idstr, player_stat|
              player = season.players.find_by_idstr(idstr)
              stat = Stat.game_find_or_create_by(season: season, game: game, model: player, period: stats.quarter)
              stat.update(player_stat.attributes)
            end
          end
        end
      end

      def parse_rows(data)
        rows = []
        until data.empty?
          text = data[1].text.scrub('')
          data.shift(1) if text.match(/\d:\d\d\.\d/)
          size = data[2].nil? || data[2].text.include?(":") ? 2 : 6
          row = data.shift(size)
          row_data = Row.new(row)
          rows << row_data
        end
        return rows
      end

      def split_rows_to_quarter(rows)
        end_index = rows.find_index { |row| row.play_type == :qe }
        # some games there is no row stating the end of quarter so we get the rest of the rows
        quarter_rows = end_index ? rows[1...end_index] : rows[1..-1]
        rest_rows = end_index ? rows[end_index+1..-1] : []
        return quarter_rows, rest_rows
      end
    end
  end
end
