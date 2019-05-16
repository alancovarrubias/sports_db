FactoryBot.define do
  factory :team_stat, class: "Stat" do
    association :game
    association :season
    association :model, factory: :team
  end

  factory :player_stat, class: "Stat" do
    association :game
    association :season
    association :model, factory: :player
  end
end
