class Game < ApplicationRecord
  belongs_to :season
  belongs_to :home_team, class_name: "Team"
  belongs_to :away_team, class_name: "Team"
  has_many :stats, -> { includes(:player, :team).order(sp: :desc) }, dependent: :destroy
  has_many :bets
  has_many :lines

  FIELDS = ["away", "home"]
  MODELS = ["player", "team"]
  PERIODS = [0, 1, 2, 3, 4]
  TYPES = ["game", "season"]

  def teams
    return [self.away_team, self.home_team]
  end
  
  def prev_games
    return Game.where(season: season).where("date < ?", self.date).order(date: :desc)
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
      stat = Stat.season_stats().where("game_id < ?", game.id).order("game_id DESC").first
      [team, stat]
    end]
  end

  def latest_team_prev_stats(games_back)
    teams = season.teams
    return Hash[teams.map do |team|
      stat = Stat.prev_stats(games_back).where("game_id < ?", game.id).order("game_id DESC").first
      [team, stat]
    end]
  end

  def period_stats(period=0)
    stats.where(period: period)
  end

  def game_stats(period=0)
    period_stats(period).where(games_back: nil, season_stat: false)
  end

  def season_stats(period=0)
    period_stats(period).where(season_stat: true)
  end

  def prev_stats(num, period=0)
    period_stats(period).where(season_stat: false, games_back: num)
  end

  MODELS.each do |model|
    query = { model_type: model.capitalize }
    TYPES.each do |type|
      define_method("#{type}_#{model}_stats") do |period=0|
        return self.send("#{type}_stats", period).where(query)
      end
      define_method("prev_#{model}_stats") do |num, period=0|
        return self.send("prev_stats", num, period).where(query)
      end
      FIELDS.each do |field|
        stat = model == "player" ? "stats" : "stat"
        define_method("#{type}_#{field}_#{model}_#{stat}") do |period=0|
          stats = self.send("#{type}_#{model}_stats", period)
          team = self.send("#{field}_team_id")
          return model == "player" ? stats.where(players: { team: team }) : stats.find_by(team: team)
        end
        define_method("prev_#{field}_#{model}_#{stat}") do |num, period=0|
          stats = self.send("prev_#{model}_stats", num, period)
          team = self.send("#{field}_team")
          return model == "player" ? stats.where(players: { team: team }) : stats.find_by(team: team)
        end
      end
    end
  end

  def show_data
    away_team_name = self.away_team.name
    home_team_name = self.home_team.name
    away_players = {}
    home_players = {}
    PERIODS.each do |period|
      away_players[period] = self.game_away_player_stats(period).map(&:stat_hash)
      home_players[period] = self.game_home_player_stats(period).map(&:stat_hash)
    end
    return {
      season: { id: season.id, year: season.year },
      game: {
          away_team: {
          name: away_team_name,
          players: away_players
        },
        home_team: {
          name: home_team_name,
          players: home_players
        }
      }
    }
  end

  def index_data(period)
    hash = {}
    hash[:id] = game.id
    hash[:away_team] = game.away_team.name
    hash[:home_team] = game.home_team.name
    hash[:date] = game.date
    bet = game.bets.find { |bet| period == bet.period && bet.desc == "old" }
    if bet
      hash[:away_pred] = bet.away_prediction ? bet.away_prediction.round(2) : "N/A"
      hash[:home_pred] = bet.home_prediction ? bet.home_prediction.round(2) : "N/A"
      hash[:away_score] = bet.away_score
      hash[:home_score] = bet.home_score
    end
    line = game.lines.find { |line| period == line.period }
    if line
      hash[:spread] = line.spread
      hash[:total] = line.total
    end
    return hash
  end

  def url
    "%d%02d%02d0#{home_team.abbr}" % [date.year, date.month, date.day]
  end

  def method_missing(method, *args, &block)
    @game_stat ||= Stats::Game.new(self)
    return @game_stat.send(method, *args)
  end
end
