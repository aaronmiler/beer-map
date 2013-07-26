class MainController < ApplicationController
   
   USER_ID, PASSWORD = ENV['UPDATE_UN'], ENV['UPDATE_PW']
 
   # Require authentication only for edit and delete operation
   before_filter :authenticate, :only => [ :update  ]

	def index
		Brewery.update_location
		@city = "Portland Oregon"
		@location = Geocoder.search(@city).first.data
		@lat = @location['geometry']['location']['lat']
		@lon = @location['geometry']['location']['lng']
		@breweries = Brewery.where('city = ?','Portland')
		puts @breweries.count
	end
	def about

	end
	def update
	end
	def upload
    require 'csv' 
    filename = File.open(params[:file].path, "r:ISO-8859-1")
    CSV.read(filename, "r:windows-1250", :headers => true).each do |row|
    	brew = Brewery.where('name = ?', row['name'])
    	unless brew.empty?
        row.each do |a|
          brew.instance_variable_get('@'+a[0])
          brew.send(a[0].downcase.gsub('_','')+'=', a[1])
        end
        brew.save
	    else
	    	brew = Brewery.new
        row.each do |a|
          brew.instance_variable_get('@'+a[0])
          brew.send(a[0].downcase.gsub('_','')+'=', a[1])
        end
        brew.save()
	    end
    end
	end

	private
   def authenticate
      authenticate_or_request_with_http_basic do |id, password| 
          id == USER_ID && password == PASSWORD
      end
   end
end
