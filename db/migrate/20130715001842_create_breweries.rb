class CreateBreweries < ActiveRecord::Migration
  def change
    create_table :breweries do |t|
      t.string :name
      t.text :desc
      t.string :lat
      t.string :lon
      t.string :city
      t.string :state
      t.string :country
      t.boolean :food
      t.boolean :tour
      t.string :address
      t.boolean :seasonal
      t.boolean :take_home
      t.string :postcode
      t.string :phone

      t.timestamps
    end
  end
end
