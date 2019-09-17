module StatQueryHelper
  QUERY_TYPES = [:game, :season, :games_back]
  QUERY = {
    game: { season_stat: false, games_back: nil },
    season: { season_stat: true },
    games_back: { season_stat: false },
  }
  QUERY_TYPES.each do |query_type|
    define_method("#{query_type}_stats") do |query={}|
      throw "#{query_type} query requires games_back property" if query[:games_back] == nil && [:games_back].include?(query_type)
      return Stat.where(query.merge(QUERY[query_type]))
    end
    define_method("#{query_type}_find_or_create_by") do |attributes={}|
      throw "#{query_type} create requires games_back property" if attributes[:games_back] == nil && [:season, :games_back].include?(query_type)
      return Stat.find_or_create_by(attributes.merge(QUERY[query_type]))
    end
  end
end
