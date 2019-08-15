class Game < ApplicationRecord
  validates :date, presence: true

  belongs_to :season
  belongs_to :away_team, class_name: 'Team', foreign_key: :away_team_id
  belongs_to :home_team, class_name: 'Team', foreign_key: :home_team_id
  has_many :stats

  PERIODS = [0]

  def date_id
    day = sprintf '%02d', date.day
    month = sprintf '%02d', date.month
    return "#{home_team.alt_abbr}#{date.year}#{month}#{day}#{num}"
  end

  def build_command
    away_team_name = away_team.name.gsub(/\s+|\./, '')
    home_team_name = home_team.name.gsub(/\s+|\./, '')
    away_team_city = away_team.city.gsub(/\s+|\./, '')
    home_team_city = home_team.city.gsub(/\s+|\./, '')
    away_team_abbr = away_team.alt_abbr
    home_team_abbr = home_team.alt_abbr
    return "stats.py #{away_team_name} #{away_team_city} #{away_team_abbr}"\
        " #{home_team_name} #{home_team_city} #{home_team_abbr} #{date_id}"
  end

  def pitcher_stats
    stats.where(stat_type: 'PITCHER')
  end

  def batter_stats
    stats.where(stat_type: 'BATTER')
  end

  def index_data
    index_hash = {}
    index_hash[:id] = self.id
    index_hash[:season_id] = self.season_id
    index_hash[:away_team] = self.away_team.name
    index_hash[:home_team] = self.home_team.name
    index_hash[:date] = self.date
    bets = {}
    lines = {}
    PERIODS.each do |period|
      bets[period] = {}
      lines[period] = {}
    end
    index_hash[:bets] = bets
    index_hash[:lines] = lines
    return index_hash
  end

  def show_data
    away_team_name = self.away_team.name
    home_team_name = self.home_team.name
    return {
      away_team: {},
      home_team: {},
    }
  end
end
