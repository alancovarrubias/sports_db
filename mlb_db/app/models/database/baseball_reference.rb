module Database
  module BaseballReference
    require 'open-uri'
    BASEBALL_REFERENCE = "https://www.baseball-reference.com"
    def teams_data(season)
      url = "https://www.basketball-reference.com/teams/HOU/2019.html"
      return Nokogiri::HTML(open(url))
      return Nokogiri::HTML(open("https://www.basketball-reference.com/leagues/NBA_2019.html"))
      return data("leagues/MLB/#{season.year}.shtml")
    end
    def players_data(team)
      return data("teams/#{team.abbr}/#{team.season.year}.shtml")
    end

    private
      def data(path)
        url = File.join(BASEBALL_REFERENCE, path)
        return Nokogiri::HTML(open(url, read_timeout: 10))
      rescue OpenUri::HTTPError => e
        puts "URL #{url} not found"
        return false
      rescue Net::ReadTimeout => e
        retry
      rescue Net::OpenTimeout => e
        puts "URL #{url} timeout"
        return false
      end
  end
end
