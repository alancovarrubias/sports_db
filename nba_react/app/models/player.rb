class Player < ApplicationRecord
  belongs_to :team
  belongs_to :season
  has_many :stats, as: :model, dependent: :destroy
  scope :by_minutes, -> { order("stats.sp DESC") }
end
