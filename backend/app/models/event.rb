class Event < ApplicationRecord
  belongs_to :user
  has_many :event_comments, dependent: :destroy
  has_many :event_likes
  has_many :liked_by_users, through: :likes, source: :user
end
