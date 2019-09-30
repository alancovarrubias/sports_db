module Database
  module GamesBackStatsBuilder
    extend self
    def run(season, games_back)
      period_stores = Hash[PERIODS.map { |period| [period, GamesBack::Store.new(games_back)] }]
      games = season.games.order(id: :asc)
      games.each do |game|
        puts "Build Games Back Stats Game: #{game.id}"
        PERIODS.each do |period|
          store = period_stores[period]
          stats = game.game_team_stats(period: period) + game.game_player_stats(period: period)
          stats.each do |stat| 
            key = stat.model_type == "Team" ? stat.model.abbr : stat.model.idstr
            store.init_key(key)
            season_count = store.season_stat_count(key)
            if season_count > 0
              season_stat = Stat.season_find_or_create_by(season: season, game: game, model: stat.model, period: period, games_back: season_count)
              season_stat.update(store.season_stat(key))
            end
            if store.games_back_list_size(key) == games_back
              games_back_stat = Stat.games_back_find_or_create_by(season: season, game: game, model: stat.model, period: period, games_back: games_back)
              games_back_stat.update(store.games_back_stat(key))
            end
            store.add(key, stat.data_hash)
          end
        end
        RatingsBuilder.run(game.season_stats())
        RatingsBuilder.run(game.games_back_stats(games_back: games_back))
        OrtgDiffBuilder.new(season, games_back)
      end
    end
  end
end
