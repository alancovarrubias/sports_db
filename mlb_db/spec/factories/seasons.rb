FactoryBot.define do
  factory :season do
    sequence(:year) { |n| 2000 + n }
    
    trait :with_teams do
      after(:create) { |season| create_list(:team, 5, season: season) }
    end
  end
end
