require 'csv'

module Database
  class Builder
    def initialize(year)
      @year = year
    end

    def run(options={})
      @season = Season.find_or_create_by(year: @year)
      if options[:stats]
        @teams = @season.teams
        @players = @season.players
        @games = @season.games.where("id > 4923")
      else
        @teams = Team.where(id: build(:teams, model: Team).map(&:id))
        @players = Player.where(id: @teams.map { |team| build(:players, model: Player, team: team) }.flatten.map(&:id))
        @games = Game.where(id: @teams.map { |team| build(:games, model: Game, team: team) }.flatten.map(&:id))
      end
      @games.each { |game| build(:stats, model: Stat, game: game) }
    end

    def get_message(key, options)
      year = @season.year
      abbr = options[:team].alt_abbr if options[:team]
      case key
      when :teams
         return "Build #{year} Teams"
      when :games
        command = "Build #{year} #{abbr} Games"
      when :players
        command = "Build #{year} #{abbr} Players"
      when :stats
        game = options[:game]
        command = "Build #{game.id} #{game.date_id} Stats"
      end
    end
    
    def build(key, options={})
      puts get_message(key, options)
      build_data(key, options)
      filename = get_filenames(key, options)
      if filename.respond_to?(:each)
        models = []
        filename.each do |filename|
          models += build_models(filename, options)
        end
        return models
      else
        return build_models(filename, options)
      end
    end

    def build_models(filename, options)
      rows = CSV.read(filename, headers: true)
      headers = rows.headers
      return rows.map do |row|
        attributes = build_attributes(headers, row, options)
        options[:model].find_or_create_by(attributes)
      end
    end

    def build_attributes(headers, row, options)
      attributes = headers.map { |attr| [attr, convert_value(row, attr)] }.to_h
      attributes.merge!({ season: @season })
      attributes.merge!({ game: options[:game] }) if options[:model] == Stat
      return attributes
    end

    def build_data(key, options)
      year = @season.year
      abbr = options[:team].abbr if options[:team]
      case key
      when :teams
        command = "teams.py #{year}"
      when :games
        command = "games.py #{year} #{abbr}"
      when :players
        command = "players.py #{year} #{abbr}"
      when :stats
        command = options[:game].build_command
      end
      `python3 app/models/database/#{command}`
    end

    def get_filenames(key, options)
      year = @season.year
      abbr = options[:team].abbr if options[:team]
      date_id = options[:game].date_id if options[:game]
      filenames = {
        teams: "tmp/teams/#{year}.csv",
        games: "tmp/games/#{year}/#{abbr}.csv",
        players: "tmp/players/#{year}/#{abbr}.csv",
        stats: [
          "tmp/stats/#{date_id}/away_pitching.csv",
          "tmp/stats/#{date_id}/away_batting.csv",
          "tmp/stats/#{date_id}/home_pitching.csv",
          "tmp/stats/#{date_id}/home_batting.csv"
        ]
      }
      return filenames[key]
    end

    def convert_value(row, attr)
      if ['team', 'away_team', 'home_team'].include?(attr)
        @teams.find_by_abbr(row[attr])
      elsif attr == 'date'
        Date.parse(row[attr])
      elsif attr == 'model'
        @players.find_by_alias(row[attr])
      else
        row[attr]
      end
    end
  end
end
