class Resume < ApplicationRecord
  has_many :resume_comments, dependent: :destroy
  belongs_to :user
end
