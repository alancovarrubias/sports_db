module Stats
  class Game
    attr_reader :game, :season
    def initialize(game)
      @game = game
      @season = game.season
    end

    def prev_away_player_stats(num=nil)
      return game.away_player_stats.map do |stat|
        prev_player_stats(stat, num)
      end
    end

    def prev_home_player_stats(num=nil)
      return game.home_player_stats.map do |stat|
        prev_player_stats(stat, num)
      end
    end

    def prev_away_team_stat(num=nil)
      return prev_team_stats(game.away_team_stat, num)
    end
    
    def prev_home_team_stat(num=nil)
      return prev_team_stats(game.home_team_stat, num)
    end

    def prev_team_stats(stat, num=nil)
      stats = stat.prev_game_stats(num)
      team_stat = Stat.build_model(stats)
      opp_stat = Stat.build_model(stats.map(&:opp_stat))
      team_stat.instance_variable_set(:@opp_stat, opp_stat)
      opp_stat.instance_variable_set(:@opp_stat, team_stat)
      team_stat.ortg = team_stat.calc_ortg
      team_stat.drtg = team_stat.calc_drtg
      return team_stat
    end

    def prev_player_stats(stat, num=nil)
      stats = stat.prev_stats(num)
      player_stat = Stat.build_model(stats)
      team_stat = Stat.build_model(stats.map(&:team_stat))
      opp_stat = Stat.build_model(stats.map(&:opp_stat))
      player_stat.instance_variable_set(:@team_stat, team_stat)
      player_stat.instance_variable_set(:@opp_stat, opp_stat)
      team_stat.instance_variable_set(:@opp_stat, opp_stat)
      opp_stat.instance_variable_set(:@opp_stat, team_stat)
      player_stat.ortg = player_stat.calc_ortg
      player_stat.drtg = player_stat.calc_drtg
      return player_stat
    end
  end
end
