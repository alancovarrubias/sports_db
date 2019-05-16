class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.belongs_to :season
      t.belongs_to :away_team
      t.belongs_to :home_team
      t.date :date
      t.integer :num
    end
  end
end
