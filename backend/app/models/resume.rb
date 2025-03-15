class Resume < ApplicationRecord
  has_many :resume_comments, dependent: :destroy
  has_many :resume_likes
  has_many :liked_by_users, through: :likes, source: :user

  belongs_to :user
end
