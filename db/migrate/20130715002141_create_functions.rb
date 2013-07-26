class CreateFunctions < ActiveRecord::Migration
  def change
    create_table :function do |t|

      t.timestamps
    end
  end
end
