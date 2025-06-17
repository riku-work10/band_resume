class Event < ApplicationRecord
  belongs_to :user
  has_many :event_comments, dependent: :destroy
  has_many :event_likes, dependent: :destroy
  has_many :liked_by_users, through: :likes, source: :user
  has_many :setlists, dependent: :destroy
  has_many :event_tags, dependent: :destroy
  has_many :tags, through: :event_tags
end
