FactoryBot.define do
  factory :resume do
    title { "Sample Resume" }
    introduction { "Some content" }
    association :user
  end
end
