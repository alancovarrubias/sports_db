module Builder
  module Quarter
    module Stats
      include BasketballReference
      extend self
      STAT_ATTR = [:sp, :fgm, :fga, :thpa, :thpm, :fta, :ftm, :orb, :drb, :ast, :stl, :blk, :tov, :pf, :pts]
      def build(season, games)
        @season = season
        games.each do |game|
          @game = game
          quarter = build_stats
          (1..quarter).each do |period|
            puts "Period #{period}"
            ::Builder::Team::Stats.build(game, period)
          end
          (1..4).each do |period|
            ::Builder::Stats::Previous.build_season(game, period)
            ::Builder::Stats::Previous.build_previous(game, period, 10)
          end
        end
      end

      def build_stats
        puts "Quarter Stat #{@game.url} #{@game.id}"
        @store = Quarter::Store.new(@season, @game, @game.away_team, @game.home_team)
        data = basketball_data("/boxscores/pbp/#{@game.url}.html", "#pbp td").to_a
        parse_rows(data)
        return @store.quarter
      end


      def parse_rows(data)
        last = data.last
        until data.empty?
          data.shift(1) if data[1].text.match(/\d:\d\d\.\d/)
          row = Quarter::Row.new(data, @game.away_team, @game.home_team)
          case row.play.type
          when /qs/
            @store.quarter_start
          when /qe/
            @store.quarter_end
          when /sub/
            @store.substitution(row)
          when /score/
            @store.score(row) if row.player1
          end
        end
        @store.quarter_end unless last.text.match(/quarter|overtime/)
        @store.quarter = @store.quarter - 1
      end
    end
  end
end
