module Builder
  module Stats
    module Builder
      extend self
      PERIODS = [0, 1, 2, 3, 4]
      def build(season, games_back_size)
        period_stores = Hash[PERIODS.map { |period| [period, Store.new(Stat.reference_hash, games_back_size)] }]
        season.games.each do |game|
          PERIODS.each do |period|
            store = period_stores[period]
            team_stats = game.game_team_stats(period)
            player_stats = game.game_player_stats(period)
            team_stats.each do |team_stat| 
              key = team_stat.model.abbr
              season_stat = Stat.season_find_or_create_by(season: season, game: game, model: team_stat.model, period: period)
              games_back_stat = Stat.games_back_find_or_create_by(season: season, game: game, model: team_stat.model, period: period)
              season_stat.update(store.season_stat(key))
              games_back_stat.update(store.games_back_stat(key))
              store.add_stats(team_stat.model.abbr, team_stat)
            end
            player_stats.each do |player_stat|
              key = player_stat.model.idstr
              season_stat = Stat.season_find_or_create_by(season: season, game: game, model: player_stat.model, period: period)
              games_back_stat = Stat.games_back_find_or_create_by(season: season, game: game, model: player_stat.model, period: period)
              seasons_stat.update(store.season_stat(key))
              games_back_stat.update(store.games_back_stat(key))
              store.add_stats(key, player_stat)
            end
          end
        end
      end
    end
  end
end
