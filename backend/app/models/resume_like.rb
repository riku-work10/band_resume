class ResumeLike < ApplicationRecord
  belongs_to :user
  belongs_to :resume
  
  validates :user_id, uniqueness: { scope: :resume_id}
end
