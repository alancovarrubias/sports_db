module Stats
  class AggregateStat
    attr_accessor :stat
    def initialize(stats, team_stats, opp_stats)
      @stat = build_stat(stats, team_stats, opp_stats)
    end

    def build_stat(stats, team_stats, opp_stats)
      model_type = stats.first.model_type
      stat = Stat.new
      stat.add(stats.map(&:data_hash))
      team_stat = Stat.new
      team_stat.add(team_stats.map(&:data_hash))
      opp_stat = Stat.new
      opp_stat.add(opp_stats.map(&:data_hash))
      team_stat.instance_variable_set(:@team_stat, team_stat)
      team_stat.instance_variable_set(:@opp_stat, opp_stat)
      opp_stat.instance_variable_set(:@team_stat, opp_stat)
      opp_stat.instance_variable_set(:@opp_stat, team_stat)
      stat.instance_variable_set(:@team_stat, team_stat)
      stat.instance_variable_set(:@opp_stat, opp_stat)
      stat.instance_variable_set(:@stat_proxy, Stats::Player.new(stat, team_stat, opp_stat))
      team_stat.instance_variable_set(:@stat_proxy, Stats::Team.new(team_stat, opp_stat))
      opp_stat.instance_variable_set(:@stat_proxy, Stats::Team.new(team_stat, opp_stat))
      return stat
    end

    def method_missing(method, *args, &block)
      self.stat.send(method, *args)
    end
  end
end
