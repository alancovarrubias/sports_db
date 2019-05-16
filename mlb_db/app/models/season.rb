class Season < ApplicationRecord
  validates :year, presence: true, uniqueness: true

  has_many :teams
  has_many :players
  has_many :games
end
