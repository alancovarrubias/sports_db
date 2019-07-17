class AddFlagToStat < ActiveRecord::Migration[5.0]
  def change
    add_column :stats, :calc, :boolean, default: false
  end
end
