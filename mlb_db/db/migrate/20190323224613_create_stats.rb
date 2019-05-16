class CreateStats < ActiveRecord::Migration[5.1]
  def change
    create_table :stats do |t|
      t.belongs_to :season
      t.belongs_to :game
      t.belongs_to :model, polymorphic: true
      t.string :stat_type
      t.string :venue
      t.float :IP
      t.integer :H
      t.integer :R
      t.integer :ER
      t.integer :BB
      t.integer :HR
      t.float :ERA
      t.integer :AB
      t.integer :RBI
      t.integer :SO
      t.integer :PA
      t.float :BA
      t.float :OBP
      t.float :SLG
      t.float :OPS
    end
  end
end
