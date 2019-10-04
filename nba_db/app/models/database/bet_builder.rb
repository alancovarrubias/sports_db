module Database
  module BetBuilder
    extend self
    def run(season, games)
      games.each do |game|
        build_bet(season, game)
      end
    end

    def build_bet(season, game)
      puts "Bet #{game.url} #{game.id}"
      PERIODS.each do |period|
        algorithm = Algorithm::OrtgDiff.new(game, period)
        away_prediction, home_prediction = algorithm.predict_score(10)
        away_score = game.game_away_team_stat(period: period).pts
        home_score = game.game_home_team_stat(period: period).pts
        bet = Bet.find_or_create_by(season: season, game: game, period: period, desc: "ortg_diff")
        bet.update(
          away_score: away_score, home_score: home_score,
          away_prediction: away_prediction, home_prediction: home_prediction
        )
      end
    end
  end
end
