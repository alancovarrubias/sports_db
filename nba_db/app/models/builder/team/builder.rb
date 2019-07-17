module Builder
  module Team
    module Builder
      extend self
      def run(season)
        year = season.year
        names = get_names(year); cities = get_cities(year); abbrs = get_abbrs(year)
        teams = (0...30).map do |index|
          ::Team.find_or_create_by(season: season, name: names[index], city: cities[index], abbr: abbrs[index])
        end
      end

      def get_names(year)
        ch = year <= 2014 ? "Bobcats" : "Hornets"
        no = no(year)[:name]
        ok = year <= 2008 ? "SuperSonics" : "Thunder"
        %W[Hawks Celtics Nets #{ch} Bulls Cavaliers Mavericks Nuggets Pistons Warriors Rockets Pacers Clippers Lakers Grizzlies Heat Bucks Timberwolves #{no} Knicks #{ok} Magic 76ers Suns Trail\ Blazers Kings Spurs Raptors Jazz Wizards]
      end

      def get_cities(year)
        br = year <= 2012 ? "New Jersey" : "Brooklyn"
        ok = year <= 2008 ? "Seattle" : "Oklahoma City"
        no = no(year)[:city]
        %W[Atlanta Boston #{br} Charlotte Chicago Cleveland Dallas Denver Detroit Golden\ State Houston Indiana Los\ Angeles Los\ Angeles Memphis Miami Milwaukee Minnesota #{no} New\ York #{ok} Orlando Philadelphia Phoenix Portland Sacramento San\ Antonio Toronto Utah Washington]
      end

      def get_abbrs(year)
        ch = year <= 2014 ? "CHA" : "CHO"
        no = no(year)[:abbr]
        br = year <= 2012 ? "NJN" : "BRK"
        ok = year <= 2008 ? "SEA" : "OKC"
        %W[ATL BOS #{br} #{ch} CHI CLE DAL DEN DET GSW HOU IND LAC LAL MEM MIA MIL MIN #{no} NYK #{ok} ORL PHI PHO POR SAC SAS TOR UTA WAS]
      end

      def no(year)
        if year > 2013 
          return { name: "Pelicans", city: "New Orleans", abbr: "NOP" }
        elsif year > 2007
          return { name: "Hornets", city: "New Orleans", abbr: "NOH" }
        elsif year > 2005
          return { name: "Hornets", city: "New Orleans/Oklahoma City", abbr: "NOK" }
        else
          return { name: "Hornets", city: "New Orleans", abbr: "NOH" }
        end
      end
    end
  end
end
