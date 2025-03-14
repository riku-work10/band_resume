class ResumeComment < ApplicationRecord
  belongs_to :user
  belongs_to :resume

  validates :content, presence: true, length: { maximum: 500 }
end
