class Player < ApplicationRecord
  validates :name, presence: true

  belongs_to :season
  belongs_to :team
  has_many :stats, as: :model, dependent: :destroy
end
