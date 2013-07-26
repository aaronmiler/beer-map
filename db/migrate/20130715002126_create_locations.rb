class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :brewery_id
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.string :country
      t.string :postcode
      t.string :lat
      t.string :lon

      t.timestamps
    end
  end
end
