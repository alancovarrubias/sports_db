FactoryBot.define do
  factory :player do
    association :team
    season { team.season }
    sequence(:name) { |n| "Test Player #{n}" }
  end
end
