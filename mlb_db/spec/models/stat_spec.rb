require 'rails_helper'

RSpec.describe Stat, type: :model do
  it "has a valid team_stat factory" do
    expect(FactoryBot.build(:team_stat)).to be_valid
  end
  it "has a valid player_stat factory" do
    expect(FactoryBot.build(:player_stat)).to be_valid
  end
  it "is valid with a season, game, and team" do
    stat = Stat.new(
      season: FactoryBot.build(:season),
      game: FactoryBot.build(:game),
      model: FactoryBot.build(:team)
    )
  end
  it "is valid with a season, game, and player" do
    stat = Stat.new(
      season: FactoryBot.build(:season),
      game: FactoryBot.build(:game),
      model: FactoryBot.build(:player)
    )
  end
  it "is invalid without a season" do
    game = FactoryBot.build(:team_stat, season: nil)
    game.valid?
    expect(game.errors[:season]).to include("must exist")
  end
  it "is invalid without a game" do
    game = FactoryBot.build(:team_stat, game: nil)
    game.valid?
    expect(game.errors[:game]).to include("must exist")
  end
  it "is invalid without a model" do
    game = FactoryBot.build(:team_stat, model: nil)
    game.valid?
    expect(game.errors[:model]).to include("must exist")
  end
end
