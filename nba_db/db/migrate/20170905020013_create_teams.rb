class CreateTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :teams do |t|
      t.references :season
      t.string :name
      t.string :abbr
      t.string :abbr2
      t.string :city
    end
  end
end
