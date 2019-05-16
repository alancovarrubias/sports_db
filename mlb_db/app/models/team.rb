class Team < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :season_id }

  belongs_to :season
  has_many :players
end
