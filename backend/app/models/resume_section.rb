class ResumeSection < ApplicationRecord
  has_many :resume_items, -> { order(:position) }, dependent: :destroy
  belongs_to :resume

  validates :position, presence: true, numericality: { only_integer: true }

end
