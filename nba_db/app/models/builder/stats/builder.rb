module Builder
  module Stats
    module Builder
      extend self
      PERIODS = [0, 1, 2, 3, 4]
      def build(season, games_back)
        period_stores = Hash[PERIODS.map { |period| [period, Store.new(Stat.data_hash, games_back)] }]
        season.games.each do |game|
          puts "Build Games Back Stats Game: #{game.id}"
          PERIODS.each do |period|
            store = period_stores[period]
            team_stats = game.game_team_stats(period)
            player_stats = game.game_player_stats(period)
            team_stats.each do |team_stat| 
              key = team_stat.model.abbr
              store.add(key, team_stat.data_hash)
              season_stat = Stat.season_find_or_create_by(season: season, game: game, model: team_stat.model, period: period)
              games_back_stat = Stat.games_back_find_or_create_by(games_back, season: season, game: game, model: team_stat.model, period: period)
              season_stat.update(store.season_stat(key))
              games_back_stat.update(store.games_back_stat(key))
            end
            player_stats.each do |player_stat|
              pp period
              pp player_stat.starter
              key = player_stat.model.idstr
              store.add(key, player_stat.data_hash)
              season_stat = Stat.season_find_or_create_by(season: season, game: game, model: player_stat.model, period: period)
              games_back_stat = Stat.games_back_find_or_create_by(games_back, season: season, game: game, model: player_stat.model, period: period)
              season_stat.update(store.season_stat(key).merge(starter: player_stat.starter))
              games_back_stat.update(store.games_back_stat(key).merge(starter: player_stat.starter))
            end
          end
        end
      end
    end
  end
end
