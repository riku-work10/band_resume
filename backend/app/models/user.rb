class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  #アソシエーションたち
  has_many :resumes, dependent: :destroy
  has_many :resume_comments, dependent: :destroy
  has_many :resume_likes
  has_many :liked_resumes, through: :resume_likes, source: :resume
  has_many :events, dependent: :destroy
  has_many :event_likes
  has_many :liked_events, through: :event_likes, source: :event

  validates :email, presence: true, uniqueness: true
end
