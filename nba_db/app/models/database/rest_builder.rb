module Database
  module RestBuilder
    extend self
    def run(season)
      games = season.games
      teams = season.teams
      rest_store = Hash[teams.map { |team| [team, 3] }]
      prev_date = games.first.date
      games.each do |game|
        date = game.date
        if date != prev_date
          teams.each do |team|
            rest_store[team] += 1 unless rest_store[team] == 3
          end
          prev_date = date
        end
        away_team = game.away_team
        home_team = game.home_team
        away_rest = rest_store[away_team]
        home_rest = rest_store[home_team]
        game.game_team_stats(team: away_team).update_all(rest: away_rest)
        game.game_team_stats(team: home_team).update_all(rest: home_rest)
        rest_store[away_team] = -1
        rest_store[home_team] = -1
        puts "#{game.url} away_rest #{away_rest} home_rest #{home_rest} #{date}"
      end
    end
  end
end
