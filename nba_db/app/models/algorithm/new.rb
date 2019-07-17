module Algorithm
  class New
    def initialize(game, period)
      @game = game
      @period = period
    end
    def predict_score(games_back)
      return if @game.prev_away_games.size < 10 || @game.prev_home_games.size < 10
      possessions = predict_possessions(games_back) / 100
      away_player_stats = @game.game_away_player_stats(@period)
      home_player_stats = @game.game_home_player_stats(@period)
      away_team_ortg = predict_team_ortg(away_player_stats)
      home_team_ortg = predict_team_ortg(home_player_stats)
      away_team_drtg = predict_team_drtg(games_back)
      home_team_drtg = predict_team_drtg(games_back)
      away_score = away_team_ortg * possessions
      home_score = home_team_ortg * possessions
      return [away_score, home_score]
    end

    def predict_team_ortg(stats)
      # BUG: The ORTG comes outs as nil for some stats
      poss_percent_sum = 0
      predictions = stats.map do |stat|
        poss_percent = self.predict_player_poss_percent(stat)
        poss_percent_sum += poss_percent
        ortg = self.predict_player_ortg(stat, poss_percent)
        ortg * poss_percent
      end
      return (predictions.inject(0) {|mem, num| mem + num}) / poss_percent_sum
    end

    def predict_possessions(games_back)
      away_team_season = @game.season_away_team_stat(@period)
      home_team_season = @game.season_home_team_stat(@period)
      away_team_season_poss = away_team_season.tot_poss/away_team_season.games_back
      home_team_season_poss = home_team_season.tot_poss/home_team_season.games_back
      away_team_prev = @game.prev_away_team_stat(games_back)
      home_team_prev = @game.prev_home_team_stat(games_back)
      away_team_prev_poss = away_team_prev.tot_poss/games_back
      home_team_prev_poss = home_team_prev.tot_poss/games_back

      away_poss = (away_team_season_poss + away_team_prev_poss) / 2
      home_poss = (home_team_season_poss + home_team_prev_poss) / 2
      return (away_poss + home_poss) / 2
    end

    def predict_player_poss_percent(stat)
      prev_stats = stat.prev_stats.limit(10)
      return 0 if prev_stats.size == 0
      poss_percent = prev_stats.map(&:poss_percent).inject(0) { |mem, num| mem + num }
      return poss_percent/prev_stats.size
    end

    def predict_player_ortg(stat, predicted_poss_percent)
      prev_stats = stat.prev_ranged_stats(predicted_poss_percent, 0.05).includes(:player => :team)
      return 90 if prev_stats.size == 0
      minutes = prev_stats.map(&:mp)
      games_back = 0
      time_played = 0
      minutes.each do |minute|
        games_back += 1
        time_played += minute
        break if time_played > 240.0
      end
      prev_stats = prev_stats.limit(games_back)
      prev_game_ids = prev_stats.map(&:game_id)
      prev_team_ids = prev_stats.map(&:team).map(&:id)
=begin
  There's two teams per game, we just gotta differentiate between which stat is which
=end
      prev_model_stats = Stat.where(model_type: "Team", game_id: prev_game_ids, season_stat: false, games_back: nil).order(game_id: :desc)
      prev_team_stats = []
      prev_opp_stats = []
      prev_model_stats.each_with_index do |stat, index|
        stat.model_id == prev_team_ids[index/2] ? prev_team_stats << stat : prev_opp_stats << stat
      end
      stat = Stats::Stat.new(prev_stats, prev_team_stats, prev_opp_stats)
      ortg = stat.calc_ortg
      return ortg
    end
    
    def predict_team_drtg(team, games_back)
      @game
    end
  end
end
