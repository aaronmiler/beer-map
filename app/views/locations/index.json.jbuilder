json.array!(@locations) do |location|
  json.extract! location, :brewery_id, :name, :address, :lat, :lon
  json.url location_url(location, format: :json)
end
