module Builder
  module Quarter
    class Store
      attr_accessor :quarter
      def initialize(season, game, away_team, home_team)
        @season = season
        @game = game
        @away_team = away_team
        @home_team = home_team
        @away_lineup = Set.new
        @home_lineup = Set.new
        @possession = 0
        @quarter = 1
        @player_stats = initialize_player_stats
      end

      def quarter_start
        time = @quarter <= 4 ? 12*60 : 5*60
        @player_stats.each do |idstr, stat|
          stat.time = time
        end
      end

      def quarter_end
        # add seconds played to remaining players on court
        [@away_lineup, @home_lineup].flatten do |idstr|
          stat = @player_stats[idstr]
          stat.sp += stat.time
        end
        # save player stats to database
        @player_stats.each do |idstr, stat|
          stat.save
        end
        # clear stats
        @away_lineup.clear
        @home_lineup.clear
        @quarter += 1
        @player_stats = initialize_player_stats
      end

      def substitution(row)
        lineup = row.team1 == @away_team ? @away_lineup : @home_lineup
        lineup.delete(row.player2)
        lineup << row.player1
        stat1 = @player_stats[row.player1]
        stat2 = @player_stats[row.player2]
        # sometimes players don't get registered due to no playing time. i know it's weird
        stat1.time = row.time if stat1
        stat2.sp += stat2.time - row.time if stat2
      end

      def score(row)
        add_stats(row, 1)
        add_stats(row, 2) if row.play.stat2
      end

      private

        def add_stats(row, num)
          idstr = row.send("player#{num}")
          stat = @player_stats[idstr]
          row.play.send("stat#{num}").each do |key, value|
            stat.send("#{key}=", stat.send("#{key}") + value)
          end
        end

        def initialize_player_stats
          stats = @game.game_player_stats(0)
          hash_data = Hash[stats.map(&:player).map do |player|
            stat = PlayerStat.new(@season, @game, player, @quarter)
            [stat.idstr, stat]
          end]
          return hash_data
        end
    end
  end
end
