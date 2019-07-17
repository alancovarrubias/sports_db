module Stats
  class Stat
    attr_accessor :stat
    def initialize(stats, team_stats, opp_stats)
      @stat = build_stat(stats, team_stats, opp_stats)
    end

    def build_stat(stats, team_stats, opp_stats)
      model_type = stats.first.model_type
      stat = ::Stat.build_model(stats)
      team_stat = ::Stat.build_model(team_stats)
      opp_stat = ::Stat.build_model(opp_stats)
      team_stat.instance_variable_set(:@team_stat, team_stat)
      team_stat.instance_variable_set(:@opp_stat, opp_stat)
      opp_stat.instance_variable_set(:@team_stat, opp_stat)
      opp_stat.instance_variable_set(:@opp_stat, team_stat)
      stat.instance_variable_set(:@team_stat, team_stat)
      stat.instance_variable_set(:@opp_stat, opp_stat)
      if model_type == "Team"
        stat_proxy = Stats::Team.new(team_stat, opp_stat)
      elsif model_type == "Player"
        stat_proxy = Stats::Player.new(stat, team_stat, opp_stat)
      end
      stat.instance_variable_set(:@stat_proxy, stat_proxy)
      return stat
    end

    def method_missing(method, *args, &block)
      self.stat.send(method, *args)
    end
  end
end
