class ResumeItem < ApplicationRecord
  belongs_to :resume_section
  
  validates :position, presence: true, numericality: { only_integer: true }
end
