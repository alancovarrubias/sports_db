class AddRestToStats < ActiveRecord::Migration[5.1]
  def change
    add_column :stats, :rest, :integer
  end
end
