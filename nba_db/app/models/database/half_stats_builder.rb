module Database
  module HalfStatsBuilder
    extend self
    def run(season, games)
      games.each do |game|
        save_half_stats(season, game)
      end
    end

    def save_half_stats(season, game)
      game.game_stats(period: 0) do |stat|
        stat.model_stat
      end
    end
  end
end
