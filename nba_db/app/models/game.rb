class Game < ApplicationRecord
  include GameQueryHelper
  belongs_to :season
  belongs_to :home_team, class_name: 'Team'
  belongs_to :away_team, class_name: 'Team'
  has_many :stats, -> { includes(:player, :team).order(sp: :desc) }, dependent: :destroy
  has_many :bets, dependent: :destroy
  has_many :lines, dependent: :destroy

  def teams
    return self.away_team, self.home_team
  end

  def opp_team_stat(team, period)
    if self.away_team == team
      return self.game_away_team_stat(period)
    elsif self.home_team == team
      return self.game_home_team_stat(period)
    end
  end

  def latest_team_season_stats
    teams = season.teams
    return Hash[teams.map do |team|
      [team, Stat.season_stats(team: team).where("game_id < ?", game.id).order(game_id: :desc).first]
    end]
  end

  def latest_team_games_back_stats(games_back)
    teams = season.teams
    return Hash[teams.map do |team|
      [team, Stat.games_back_stats(games_back: games_back, team: team).where("game_id < ?", game.id).order(game_id: :desc).first]
    end]
  end

  def url
    "%d%02d%02d0#{home_team.abbr}" % [date.year, date.month, date.day]
  end

  def method_missing(method, *args, &block)
    @game_stat ||= Stats::Game.new(self)
    return @game_stat.send(method, *args)
  end
end
