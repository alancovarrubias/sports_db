module Database
  module SeasonBuilder
    extend self
    def run(year)
      puts "Build Season #{year}"
      Season.find_or_create_by(year: year)
    end
  end
end
