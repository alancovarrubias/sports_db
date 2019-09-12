class Game < ApplicationRecord
  belongs_to :season
  belongs_to :home_team, class_name: 'Team'
  belongs_to :away_team, class_name: 'Team'
  has_many :stats, -> { includes(:player, :team).order(sp: :desc) }, dependent: :destroy
  has_many :bets
  has_many :lines

  FIELDS = ['away', 'home']
  MODELS = ['player', 'team']
  PERIODS = [0, 1, 2, 3, 4]
  TYPES = ['game', 'season']

  def teams
    return [self.away_team, self.home_team]
  end
  
  def prev_games
    return Game.where(season: season).where('date < ?', self.date).order(date: :desc)
  end

  FIELDS.each do |field|
    define_method("prev_#{field}_games") do
      team_id = self.send("#{field}_team_id")
      return self.prev_games.where("away_team_id=#{team_id} OR home_team_id=#{team_id}")
    end
  end

  def opp_team_stat(team, period)
    if self.away_team == team
      return self.game_away_team_stat(period)
    elsif self.home_team == team
      return self.game_home_team_stat(period)
    else
      return nil
    end
  end

  def latest_team_season_stats
    teams = season.teams
    return Hash[teams.map do |team|
      stat = Stat.season_stats().where('game_id < ?', game.id).order('game_id DESC').first
      [team, stat]
    end]
  end

  def latest_team_games_back_stats(games_back)
    teams = season.teams
    return Hash[teams.map do |team|
      stat = Stat.games_back_stats(games_back).where('game_id < ?', game.id).order('game_id DESC').first
      [team, stat]
    end]
  end

  def period_stats(period=nil)
    period == nil ? stats : stats.where(period: period)
  end

  def game_stats(period=nil)
    period_stats(period).where(games_back: nil, season_stat: false)
  end

  def season_stats(period=nil)
    period_stats(period).where(season_stat: true)
  end

  def games_back_stats(num, period=nil)
    period_stats(period).where(season_stat: false, games_back: num)
  end

  MODELS.each do |model|
    query = { model_type: model.capitalize }
    TYPES.each do |type|
      define_method("#{type}_#{model}_stats") do |period=nil|
        return self.send("#{type}_stats", period).where(query)
      end
      define_method("games_back_#{model}_stats") do |num, period=nil|
        return self.send('games_back_stats', num, period).where(query)
      end
      FIELDS.each do |field|
        stat = model == 'player' ? 'stats' : 'stat'
        define_method("#{type}_#{field}_#{model}_#{stat}") do |period=nil|
          stats = self.send("#{type}_#{model}_stats", period)
          team = self.send("#{field}_team_id")
          return model == 'player' ? stats.where(players: { team: team }) : stats.find_by(team: team)
        end
        define_method("games_back_#{field}_#{model}_#{stat}") do |num, period=nil|
          stats = self.send("games_back_#{model}_stats", num, period)
          team = self.send("#{field}_team")
          return model == 'player' ? stats.where(players: { team: team }) : stats.find_by(team: team)
        end
      end
    end
  end

  def url
    "%d%02d%02d0#{home_team.abbr}" % [date.year, date.month, date.day]
  end

  def method_missing(method, *args, &block)
    @game_stat ||= Stats::Game.new(self)
    return @game_stat.send(method, *args)
  end
end
