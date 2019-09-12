module Builder
  module Quarter
    class QuarterStats
      include StatHelper
      attr_reader :quarter, :away_player_stats, :home_player_stats, :away_team_stat, :home_team_stat
      def initialize(quarter, rows)
        @quarter = quarter
        lineups = init_lineups(rows)
        @away_player_stats = init_player_stats(lineups[:away_starters], lineups[:away_roster])
        @home_player_stats = init_player_stats(lineups[:home_starters], lineups[:home_roster])
        populate_player_stats(rows, lineups[:away_on_floor], lineups[:home_on_floor])
        @away_team_stat = build_team_stats(@away_player_stats)
        @home_team_stat = build_team_stats(@home_player_stats)
      end

      private
        def build_team_stats(player_stats)
          return sum_stats(Stat.reference_hash, player_stats.values.map(&:attributes))
        end

        def init_lineups(rows)
          away_roster = Set.new
          away_starters = Set.new
          away_bench = Set.new
          home_roster = Set.new
          home_starters = Set.new
          home_bench = Set.new
          rows.each do |row|
            roster = row.is_away ? away_roster : home_roster
            opp_roster = row.is_away ? home_roster : away_roster
            starters = row.is_away ? away_starters : home_starters
            opp_starters = row.is_away ? home_starters : away_starters
            bench = row.is_away ? away_bench : home_bench
            opp_bench = row.is_away ? home_bench : away_bench
            if row.play_type == :sub
              bench << row.player1
              starters << row.player2 if !bench.include?(row.player2) && starters.length != 5
              roster << row.player1
              roster << row.player2
            elsif row.play_type == :score
              if row.player1
                roster << row.player1
                starters << row.player1 if !bench.include?(row.player1) && starters.length != 5
              end
              if row.player2
                roster = row.same_team ? roster : opp_roster
                bench = row.same_team ? bench : opp_bench
                starters = row.same_team ? starters : opp_starters
                roster << row.player2
                starters << row.player2 if !bench.include?(row.player2) && starters.length != 5
              end
            end
          end
          return {
            away_roster: away_roster,
            away_starters: away_starters,
            away_on_floor: away_starters.clone,
            home_roster: home_roster,
            home_starters: home_starters,
            home_on_floor: home_starters.clone,
          }
        end

        def populate_player_stats(rows, away_on_floor, home_on_floor)
          rows.each do |row|
            stats = row.is_away ? @away_player_stats : @home_player_stats
            opp_stats = row.is_away ? @home_player_stats : @away_player_stats
            on_floor = row.is_away ? away_on_floor : home_on_floor
            if row.play_type == :score
              stats[row.player1].add(row.stat1) if row.player1 # player1 should always have a stat so we only check for player
              row.same_team ? stats[row.player2].add(row.stat2) : opp_stats[row.player2].add(row.stat2) if row.stat2 # player2 may or may not have a stat
            elsif row.play_type == :foul
              stat = stats[row.player1] ? stats[row.player1] : opp_stats[row.player1]
              stat.add(row.stat1) if stat # the conditional is needed in case data is missing like in 201812160DEN offensive foul
            elsif row.play_type == :sub
              stat1 = stats[row.player1]
              stat2 = stats[row.player2]
              sp = stat2.time - row.time
              stat2.sp += sp
              stat1.time = row.time
              on_floor.delete(row.player2)
              on_floor << row.player1
            end
          end
          add_sp_to_remaining(away_on_floor, @away_player_stats)
          add_sp_to_remaining(home_on_floor, @home_player_stats)
        end

        def add_sp_to_remaining(on_floor, stats)
          on_floor.each do |player|
            stat = stats[player] 
            stat.sp += stat.time
          end
        end

        def init_player_stats(starters, roster)
          stat_hash = Hash[roster.map do |player|
            stat = PlayerStat.new(player)
            stat.time = 12*60 if starters.include?(player)
            [player, stat]
          end]
          return stat_hash
        end
    end
  end
end
