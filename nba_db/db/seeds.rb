year = 2017
builder = Database::Builder.new(year)
builder.bets(builder.games.where("id > 3360"))
