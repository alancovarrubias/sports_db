class Game < ApplicationRecord
  validates :date, presence: true

  belongs_to :season
  belongs_to :away_team, class_name: "Team", foreign_key: :away_team_id
  belongs_to :home_team, class_name: "Team", foreign_key: :home_team_id
  has_many :stats

  def date_id
    day = sprintf '%02d', date.day
    month = sprintf '%02d', date.month
    return "#{home_team.alt_abbr}#{date.year}#{month}#{day}#{num}"
  end

  def build_command
    away_team_name = away_team.name.gsub(/\s+|\./, "")
    home_team_name = home_team.name.gsub(/\s+|\./, "")
    away_team_city = away_team.city.gsub(/\s+|\./, "")
    home_team_city = home_team.city.gsub(/\s+|\./, "")
    away_team_abbr = away_team.alt_abbr
    home_team_abbr = home_team.alt_abbr
    return "stats.py #{away_team_name} #{away_team_city} #{away_team_abbr}"\
        " #{home_team_name} #{home_team_city} #{home_team_abbr} #{date_id}"
  end

  def pitcher_stats
    stats.where(stat_type: "PITCHER")
  end

  def pitcher_stats
    stats.where(stat_type: "PITCHER")
  end
end
