FactoryBot.define do
  factory :resume_comment do
    content { "Great job!" }
    association :user
    association :resume
  end
end
