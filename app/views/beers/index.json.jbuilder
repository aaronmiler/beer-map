json.array!(@beers) do |beer|
  json.extract! beer, :name, :ibu, :abv, :desc, :brewery_id
  json.url beer_url(beer, format: :json)
end
