class Stat < ApplicationRecord
  belongs_to :season
  belongs_to :game
  belongs_to :model, polymorphic: true
  belongs_to :team, -> { includes(:stats).where(stats: { model_type: 'Team' }) }, foreign_key: :model_id, optional: true
  belongs_to :player, -> { includes(:stats).where(stats: { model_type: 'Player' }) }, foreign_key: :model_id, optional: true

  DATA_STATS = [:sp, :fgm, :fga, :thpm, :thpa, :ftm, :fta, :orb, :drb, :ast, :stl, :blk, :tov, :pf, :pts]
  TOTAL_STATS = [:id, :sp, :fgm, :fga, :thpm, :thpa, :ftm, :fta, :orb, :drb, :ast, :stl, :blk, :tov, :pf, :pts, :ortg, :drtg]
  extend StatHelper
  def player
    return if model_type == 'Team'
    super
  end

  def team
    return player.team if model_type == 'Player'
    super
  end

  def self.game_stats(query={})
    return Stat.where(season_stat: false, games_back: nil).where(query)
  end

  def self.season_stats(query={})
    return Stat.where(season_stat: true).where(query)
  end

  def self.games_back_stats(games_back, query={})
    return Stat.where(season_stat: false, games_back: games_back).where(query)
  end

  def self.game_find_or_create_by(attributes)
    return Stat.find_or_create_by(attributes.merge(season_stat: false))
  end

  def self.season_find_or_create_by(games_back, attributes)
    return Stat.find_or_create_by(attributes.merge(season_stat: true, games_back: games_back))
  end

  def self.games_back_find_or_create_by(games_back, attributes)
    return Stat.find_or_create_by(attributes.merge(season_stat: false, games_back: games_back))
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

  def total_hash
    hash = Hash[self.attributes.map{|key, value| [key.to_sym, value]}.select{|key, value| TOTAL_STATS.include?(key)}]
    hash[:name] = self.name
    hash[:mp] = (self.sp / 60.0).round(2)
    hash[:ortg] = hash[:ortg].round(2)
    hash[:drtg] = hash[:drtg].round(2)
    return hash
  end

  def data_hash
    return Hash[self.attributes.map{|key, value| [key.to_sym, value]}.select{|key, value| DATA_STATS.include?(key)}]
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
