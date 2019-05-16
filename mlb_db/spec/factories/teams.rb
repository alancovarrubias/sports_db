FactoryBot.define do
  factory :team, aliases: [:away_team, :home_team] do
    association :season
    sequence(:name) { |n| "Test Team #{n}" }
  end
end
