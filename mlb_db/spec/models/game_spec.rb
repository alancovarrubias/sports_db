require 'rails_helper'

RSpec.describe Game, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.build(:game)).to be_valid
  end
  it "is valid with a season, away_team, home_team, and date" do
    game = Game.new(
      season: FactoryBot.build(:season),
      away_team: FactoryBot.build(:team),
      home_team: FactoryBot.build(:team),
      date: Date.today
    )
    expect(game).to be_valid
  end
  it "is invalid without a season" do
    game = FactoryBot.build(:game, season: nil)
    game.valid?
    expect(game.errors[:season]).to include("must exist")
  end
  it "is invalid without an away_team" do
    game = FactoryBot.build(:game, away_team: nil)
    game.valid?
    expect(game.errors[:away_team]).to include("must exist")
  end
  it "is invalid without a home_team" do
    game = FactoryBot.build(:game, home_team: nil)
    game.valid?
    expect(game.errors[:home_team]).to include("must exist")
  end
  it "is invalid without a date" do
    game = FactoryBot.build(:game, date: nil)
    game.valid?
    expect(game.errors[:date]).to include("can't be blank")
  end
end
