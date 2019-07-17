class CreateStats < ActiveRecord::Migration[5.0]
  def change
    create_table :stats do |t|
      t.references :season
      t.references :game
      t.references :model, polymorphic: true
      t.integer :games_back
      t.boolean :season_stat, default: false
      t.boolean :starter, default: false
      t.integer :period
      t.integer :sp, default: 0
      t.integer :fgm, default: 0
      t.integer :fga, default: 0
      t.integer :thpa, default: 0
      t.integer :thpm, default: 0
      t.integer :fta, default: 0
      t.integer :ftm, default: 0
      t.integer :orb, default: 0
      t.integer :drb, default: 0
      t.integer :ast, default: 0
      t.integer :stl, default: 0
      t.integer :blk, default: 0
      t.integer :tov, default: 0
      t.integer :pf, default: 0
      t.integer :pts, default: 0
      t.float :poss_percent, default: 0
      t.float :pace, default: 0
      t.float :ortg, default: 0
      t.float :drtg, default: 0
      t.float :drtg_diff, default: 0
    end
  end
end
