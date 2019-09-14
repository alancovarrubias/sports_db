class Stat < ApplicationRecord
  extend StatQueryHelper
  DATA_STATS = [:sp, :fgm, :fga, :thpm, :thpa, :ftm, :fta, :orb, :drb, :ast, :stl, :blk, :tov, :pf, :pts]
  attr_accessor :time
  belongs_to :season
  belongs_to :game
  belongs_to :model, polymorphic: true
  belongs_to :team, -> { includes(:stats).where(stats: { model_type: 'Team' }) }, foreign_key: :model_id, optional: true
  belongs_to :player, -> { includes(:stats).where(stats: { model_type: 'Player' }) }, foreign_key: :model_id, optional: true

  def player
    return if model_type == 'Team'
    super
  end

  def team
    return player.team if model_type == 'Player'
    super
  end

  def stats
    query_hash = { season: self.season, season_stat: self.season_stat, period: self.period }
    query_hash.merge!(games_back: self.games_back) unless self.season_stat
    return Stat.where(query_hash)
  end

  def game_stats
    return stats.where(game: game)
  end

  def model_stats
    return stats.where(model: model)
  end

  def games_back_stats
    return model_stats.where("game_id < #{game_id}").order(game_id: :desc)
  end

  def games_back_ranged_stats(poss_percent, range)
    return games_back_stats.where("poss_percent < #{poss_percent + range} AND poss_percent > #{poss_percent - range}")
  end

  def name
    return model.name
  end

  def opp
    return opp ||= (self.team == self.game.away_team) ? self.game.home_team : self.game.away_team if self.game
  end

  def team_stat
    @team_stat ||= game_stats.find_by(model: self.team) if self.game
    return @team_stat
  end

  def opp_stat
    @opp_stat ||= game_stats.find_by(model: self.opp) if self.game
    return @opp_stat
  end

  def add(stats)
    stats = stats.class == Array ? stats : [stats]
    stats.each { |stat| stat.each { |key, value| self.send("#{key}=", self.send(key) + value) } }
  end

  def subtract(stats)
    stats = stats.class == Array ? stats : [stats]
    stats.each { |stat| stat.each { |key, value| self.send("#{key}=", self.send(key) - value) } }
  end

  def data_hash
    return Hash[DATA_STATS.map {|stat| [stat, self.send(stat)]}]
  end

  def mp
    return sp/60.0
  end

  def mp_str
    minutes = sp/60
    seconds = "#{sp%60}".rjust(2, "0")
    return "#{minutes}:#{seconds}"
  end

  def method_missing(method, *args, &block)
    @stat_proxy ||= Stats::Player.new(self, team_stat, opp_stat) if model_type == 'Player'
    @stat_proxy ||= Stats::Team.new(self, opp_stat) if model_type == 'Team'
    return @stat_proxy.send(method, *args)
  end
end
