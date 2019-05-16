class CreateTeams < ActiveRecord::Migration[5.1]
  def change
    create_table :teams do |t|
      t.belongs_to :season
      t.string :abbr
      t.string :alt_abbr
      t.string :city
      t.string :name
    end
  end
end
