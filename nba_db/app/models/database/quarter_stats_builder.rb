module Database
  module QuarterStatsBuilder
    extend self
    extend BasketballReference
    def run(season, games)
      games.each do |game|
        quarter_stats = build_quarter_stats(game)
        save_quarter_stats(season, game, quarter_stats)
      end
    end

    def build_quarter_stats(game)
      puts "Quarter Stat #{game.url} #{game.id}"
      data = basketball_data("/boxscores/pbp/#{game.url}.html", "#pbp td").to_a
      rows = parse_rows(data)
      return QUARTERS.map do |quarter|
        quarter_rows, rows = split_rows_to_quarter(rows)
        Quarter::QuarterStats.new(quarter, quarter_rows)
      end
    end

    def save_quarter_stats(season, game, quarter_stats)
      quarter_stats.each do |stats|
        [:away, :home].each do |side|
          team = game.send("#{side}_team")
          stats.send("#{side}_player_stats").each do |idstr, player_stat|
            player = season.players.find_by(idstr: idstr, team: team)
            stat = Stat.game_find_or_create_by(season: season, game: game, model: player, period: stats.quarter, starter: player_stat.starter)
            stat.update(player_stat.data_hash)
          end
          team_stat = stats.send("#{side}_team_stat")
          stat = Stat.game_find_or_create_by(season: season, game: game, model: team, period: stats.quarter)
          stat.update(team_stat.data_hash)
        end
        RatingsBuilder.run(game.game_stats(stats.quarter))
      end
    end

    def parse_rows(data)
      rows = []
      until data.empty?
        text = data[1].text.scrub('')
        data.shift(1) if text.match(/\d:\d\d\.\d/)
        size = data[2].nil? || data[2].text.include?(":") ? 2 : 6
        row = data.shift(size)
        row_data = Quarter::Row.new(row)
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
