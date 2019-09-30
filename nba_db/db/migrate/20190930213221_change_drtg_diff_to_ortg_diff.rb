class ChangeDrtgDiffToOrtgDiff < ActiveRecord::Migration[5.1]
  def change
    rename_column :stats, :drtg_diff, :ortg_diff
  end
end
