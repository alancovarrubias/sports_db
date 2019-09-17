module StatQueryHelper
=begin
  QUERY_TYPES = [:game, :season, :games_back]
  QUERY = {
    game: { season_stat: false, games_back: nil },
    season: { season_stat: true },
  }
  QUERY_TYPES.each do |query_type|
    define_method("#{query_type}_stats") do |query={}, games_back=nil|
      return Stat.where(QUERY[query_type]).where(query)
    end
    define_method("#{query_type}_find_or_create_by") do |attributes, games_back=10|
      return Stat.find_or_create_by(attributes.merge(attributes))
    end
  end
=end
  def game_stats(query={})
    return Stat.where(season_stat: false, games_back: nil).where(query)
  end

  def season_stats(query={})
    return Stat.where(season_stat: true).where(query)
  end

  def games_back_stats(games_back, query={})
    return Stat.where(season_stat: false, games_back: games_back).where(query)
  end

  def game_find_or_create_by(attributes)
    return Stat.find_or_create_by(attributes.merge(season_stat: false))
  end

  def season_find_or_create_by(games_back, attributes)
    return Stat.find_or_create_by(attributes.merge(season_stat: true, games_back: games_back))
  end

  def games_back_find_or_create_by(games_back, attributes)
    return Stat.find_or_create_by(attributes.merge(season_stat: false, games_back: games_back))
  end
end
