module StatQueryHelper
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
