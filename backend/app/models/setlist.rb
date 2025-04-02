class Setlist < ApplicationRecord
  belongs_to :event

  validates :title, presence: true, allow_blank: true 
  validates :order, presence: true, allow_blank: true 
end
