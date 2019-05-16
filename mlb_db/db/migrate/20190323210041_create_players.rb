class CreatePlayers < ActiveRecord::Migration[5.1]
  def change
    create_table :players do |t|
      t.belongs_to :season
      t.belongs_to :team
      t.string :alias
      t.string :name
      t.string :first_name
      t.string :last_name
    end
  end
end
