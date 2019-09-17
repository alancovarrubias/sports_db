module GameQueryHelper
  QUERY_TYPES = [:game, :season, :games_back]
  QUERY = {
    game: { season_stat: false, games_back: nil },
    season: { season_stat: true },
    games_back: { season_stat: false },
  }
  FIELDS = [:away, :home]
  MODELS = [:player, :team]

  def period_stats(period=nil)
    return period == nil ? stats : stats.where(period: period)
  end

  QUERY_TYPES.each do |query_type|
    define_method("#{query_type}_stats") do |query={}|
      throw "#{query_type} query requires games_back property" if query[:games_back] == nil && [:games_back].include?(query_type)
      period = query.delete(:period)
      return period_stats(period).where(query.merge(QUERY[query_type]))
    end
    MODELS.each do |model|
      model_query = { model_type: model.capitalize }
      define_method("#{query_type}_#{model}_stats") do |query={}|
        return self.send("#{query_type}_stats", query.merge(model_query))
      end
      FIELDS.each do |field|
        stat = model == :player ? :stats : :stat
        define_method("#{query_type}_#{field}_#{model}_#{stat}") do |query={}|
          stats = self.send("#{query_type}_#{model}_stats", query)
          team = self.send("#{field}_team")
          return model == :player ? stats.where(players: { team: team }) : stats.find_by(team: team)
        end
      end
    end
  end
  
  def prev_games
    return Game.where(season: self.season).where('date < ?', self.date).order(date: :desc)
  end

  FIELDS.each do |field|
    define_method("prev_#{field}_games") do
      team_id = self.send("#{field}_team_id")
      return self.prev_games.where("away_team_id=#{team_id} OR home_team_id=#{team_id}")
    end
  end
end
