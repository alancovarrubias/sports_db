task :rating => :environment do
  Season.all.each do |season|
    Builder::Rating.run(season)
  end
end
