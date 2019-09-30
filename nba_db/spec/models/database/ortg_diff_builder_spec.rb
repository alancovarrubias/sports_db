require 'rails_helper'
require 'database'

module Database
  RSpec.describe OrtgDiffBuilder do
    before do
      @games_back = 10
      @season  = FactoryBot.create(:season)
      @away_team = FactoryBot.create(:team, season: @season)
      @home_team = FactoryBot.create(:team, season: @season)
      @game = FactoryBot.create(:game, season: @season, away_team: @away_team, home_team: @home_team)
      @builder = OrtgDiffBuilder.new(@season, @games_back)
    end
    describe "@period_team_stat_store" do
      before do
        @period_team_stat_store = @builder.instance_variable_get(:@period_team_stat_store)
      end
      it "has valid keys" do
        expect(@period_team_stat_store.keys).to eq(PERIODS)
        PERIODS.each do |period|
          expect(@period_team_stat_store[period].keys).to include(@home_team, @away_team)
        end
      end
    end
  end
end
