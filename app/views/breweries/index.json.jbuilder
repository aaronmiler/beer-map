json.array!(@breweries) do |brewery|
  json.extract! brewery, :name, :desc, :lat, :lon, :city, :state, :country, :food, :tour, :address, :seasonal, :take_home, :postcode
  json.url brewery_url(brewery, format: :json)
end
