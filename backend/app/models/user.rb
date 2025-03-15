class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  #アソシエーションたち
  has_many :resumes, dependent: :destroy
  has_many :resume_comments, dependent: :destroy
  has_many :resume_likes
  has_many :liked_resumes, through: :resume_likes, source: :resume

  validates :email, presence: true, uniqueness: true
end
