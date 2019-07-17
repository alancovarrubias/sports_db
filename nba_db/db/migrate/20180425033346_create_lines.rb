class CreateLines < ActiveRecord::Migration[5.0]
  def change
    create_table :lines do |t|
      t.references :game
      t.string :desc
      t.integer :period
      t.float :spread
      t.float :total
    end
  end
end
