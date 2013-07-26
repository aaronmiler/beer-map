class Brewery < ActiveRecord::Base

	def self.update_location
		@updates = Brewery.where('lat is null')
		@updates.each do |brew|
			location = Geocoder.search(brew.address + " " + brew.city + " " + brew.postcode + " " + brew.country).first.data
			brew.lat = location['geometry']['location']['lat']
			brew.lon = location['geometry']['location']['lng']
			brew.save
			puts brew.lat
			puts brew.lon
		end
	end
end
