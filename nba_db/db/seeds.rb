=begin
year = 2016
builder = Database::Builder.new(year)
builder.game_stats
=end
builder = Database::OrtgDiffBuilder.new(Season.first, 10)
builder.run
