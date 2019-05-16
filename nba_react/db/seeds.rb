
(2015..2018).each do |year|
  builder = Builder::Database.new(year)
  builder.build_players
end
# end
=begin
  date = Date.new(2018, 11, 14)
  games = Season.find_by_year(year).games.where("date >= ? AND date < ?", date, Date.yesterday)
  builder.build_game_stats(games)
  builder.build_quarter_stats(games)
  # builder.build_bets(games)
  # builder.build_lines(games)
builder.build_quarter_stats(Game.where(id: 3882))

builder.build_ratings

(2008..2018).each do |year|
  puts "Build #{year} Stats"
  builder = Builder::Database.new(year)
  builder.build
end

=end

# delete 201503160GSW
