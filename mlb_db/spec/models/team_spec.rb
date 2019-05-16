require 'rails_helper'

RSpec.describe Team, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.build(:team)).to be_valid
  end
  it "is valid with a season and name" do
    team = Team.new(
      season: FactoryBot.build(:season),
      name: "Dodgers"
    )
    expect(team).to be_valid
  end
  it "is invalid without a name" do
    team = FactoryBot.build(:team, name: nil)
    team.valid?
    expect(team.errors[:name]).to include("can't be blank")
  end
  it "is invalid without a season" do
    team = FactoryBot.build(:team, season: nil)
    team.valid?
    expect(team.errors[:season]).to include("must exist")
  end
  it "does not allow duplicate team names per season" do
    season = FactoryBot.create(:season)
    season.teams.create(
      name: "Dodgers"
    )
    new_team = season.teams.build(
      name: "Dodgers"
    )
    new_team.valid?
    expect(new_team.errors[:name]).to include("has already been taken")
  end
  it "allows two seasons to share a team name" do
    season = FactoryBot.create(:season)
    season.teams.create(
      name: "Dodgers"
    )
    other_season = FactoryBot.create(:season)
    other_team = other_season.teams.build(
      name: "Dodgers"
    )
    expect(other_team).to be_valid
  end
end
