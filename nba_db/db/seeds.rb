year = 2019
builder = Builder::Database.new(year)
builder.build_game_stats(builder.games.where(id: 1))
