class Resume < ApplicationRecord
  has_many :resume_comments, dependent: :destroy
  has_many :event_comments, dependent: :destroy
  has_many :resume_likes
  has_many :liked_by_users, through: :resume_likes, source: :user
  has_many :resume_sections, -> { order(:position) }, dependent: :destroy

  belongs_to :user
end
