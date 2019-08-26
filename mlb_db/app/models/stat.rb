class Stat < ApplicationRecord
  belongs_to :season
  belongs_to :game
  belongs_to :model, polymorphic: true
  belongs_to :team, -> { includes(:stats).where(stats: { model_type: 'Team' }) }, foreign_key: :model_id, optional: true
  belongs_to :player, -> { includes(:stats).where(stats: { model_type: 'Player' }) }, foreign_key: :model_id, optional: true

  PITCHER_STATS = ['IP', 'H', 'R', 'ER', 'BB', 'HR', 'ERA']
  BATTER_STATS = ['AB', 'R', 'H', 'RBI', 'SO', 'PA', 'BA', 'OBP', 'SLG', 'OPS']

  def stats
    keys = stat_type == "PITCHER" ? PITCHER_STATS : BATTER_STATS
    return attributes.select { |key, value| keys.include? key }
  end
end
