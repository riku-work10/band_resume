class Resume < ApplicationRecord
  has_many :resume_comments, dependent: :destroy
  has_many :resume_likes, dependent: :destroy
  has_many :liked_by_users, through: :resume_likes, source: :user
  has_many :resume_sections, -> { order(:position) }, dependent: :destroy
  has_many :notifications, dependent: :destroy

  belongs_to :user
end
