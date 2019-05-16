require 'rails_helper'

RSpec.describe Player, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.build(:player)).to be_valid
  end
  it "is valid with a season, team and name" do
    player = Player.new(
      season: FactoryBot.build(:season),
      team: FactoryBot.build(:team),
      name: "Mike Trout"
    )
    expect(player).to be_valid
  end
  it "is invalid without a name" do
    player = FactoryBot.build(:player, name: nil)
    player.valid?
    expect(player.errors[:name]).to include("can't be blank")
  end
end
