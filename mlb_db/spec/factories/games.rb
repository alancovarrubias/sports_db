FactoryBot.define do
  factory :game do
    association :season
    association :away_team
    association :home_team
    date Date.today
  end
end
