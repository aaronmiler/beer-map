class CreateBeers < ActiveRecord::Migration
  def change
    create_table :beers do |t|
      t.string :name
      t.integer :ibu
      t.float :abv
      t.string :desc
      t.string :brewery_id

      t.timestamps
    end
  end
end
