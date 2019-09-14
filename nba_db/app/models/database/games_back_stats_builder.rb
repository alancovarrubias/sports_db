module Database
  module GamesBackStatsBuilder
    extend self
    def run(season, games, games_back)
      period_stores = Hash[PERIODS.map { |period| [period, Stats::Store.new(games_back)] }]
      games.each do |game|
        puts "Build Games Back Stats Game: #{game.id}"
        PERIODS.each do |period|
          store = period_stores[period]
          team_stats = game.game_team_stats(period)
          player_stats = game.game_player_stats(period)
          team_stats.each do |team_stat| 
            key = team_stat.model.abbr
            store.init_key(key)
            season_count = store.season_stat_count(key)
            if season_count > 0
              season_stat = Stat.season_find_or_create_by(season_count, season: season, game: game, model: team_stat.model, period: period)
              season_stat.update(store.season_stat(key))
            end
            if store.games_back_list_size(key) == games_back
              games_back_stat = Stat.games_back_find_or_create_by(games_back, season: season, game: game, model: team_stat.model, period: period)
              games_back_stat.update(store.games_back_stat(key))
            end
            store.add(key, team_stat.data_hash)
          end
          player_stats.each do |player_stat|
            key = player_stat.model.idstr
            store.init_key(key)
            season_count = store.season_stat_count(key)
            if season_count > 0
              season_stat = Stat.season_find_or_create_by(season_count, season: season, game: game, model: player_stat.model, period: period)
              season_stat.update(store.season_stat(key).merge(starter: player_stat.starter))
            end
            if store.games_back_list_size(key) == games_back
              games_back_stat = Stat.games_back_find_or_create_by(games_back, season: season, game: game, model: player_stat.model, period: period)
              games_back_stat.update(store.games_back_stat(key).merge(starter: player_stat.starter))
            end
            store.add(key, player_stat.data_hash)
          end
        end
      end
    end
  end
end
