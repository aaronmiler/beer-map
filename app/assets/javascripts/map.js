var mapOptions = {
	center: new google.maps.LatLng(startLat,startLon),
	zoom: 13,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map"),
	mapOptions);

function addBrewery(name,lat,lon,brewid,className) {
	var myLatlng = new google.maps.LatLng(lat,lon);

  overlay = new CustomMarker(myLatlng, map, className +" brew" + brewid,brewid, name);
	// var inOptions = {
	// 	content: name +"<button data-brewid='"+brewid+"' data-center='"+overlay.getPosition()+"' class='concept' onClick='buttonClick(event)'>Click Me</button>",
	// 	boxStyle: {
	// 		background: "rgba(255,255,255,.9)",
	// 		padding: '5px',
	// 		width: '200px',
	// 		enableEventPropagation: true
	// 	}
	// }
	// var ib = new InfoBox(inOptions);

	// google.maps.event.addListener(overlay, 'click', function() {
	//   ib.open(map, this);	
	// });

}
google.maps.event.addDomListener(window, 'resize', function() {
		google.maps.event.trigger(map, 'resize');
});

function buttonClick(brewid,event){
	$.ajax({
		url: "/breweries/"+brewid,
		success:function(data){
			$("#brewery .title").html('<h1>'+data.name+'</h1>')
			$("#brewery .description").html(data.desc)
			data.seasonal ? $("#brewery .seasonal").show() : $("#brewery .seasonal").hide();
			data.food ? $("#brewery .food").show() : $("#brewery .food").hide();
			$("#map").animate({"height": "250px"}, "fast",function(){
				google.maps.event.trigger(map, 'resize');
				var newPos = $(event.target).attr('data-center').replace(/\(|\)/g,'')				
				newPos = newPos.split(',')
				newPos = new google.maps.LatLng(newPos[0],newPos[1])
				map.panTo(newPos)
				$('.infoBox').hide()
			})
		}
	})
}
$('body').on('click','.return',function(){
	$("#map").animate({
			"height": '96%',
			"bottom":"0px"
		}, "fast",function(){
		$("#map").removeAttr('style')
		$("#breweryInfo").empty()
		google.maps.event.trigger(map, 'resize');
	})

})
if(!!navigator.geolocation){
	navigator.geolocation.getCurrentPosition(function(position) {

		var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
		map.setCenter(geolocate);

		overlay = new CustomMarker(geolocate, map, "userLocation");

	});
}

$('body').on('click','.brewery i',function(event){
	buttonClick($(this).attr('data-brewid'),event)
})


// Custom handlers for clicking on a marker, as well as hovering
$('body').on('mouseenter','.brewery.marker',function(event){
	$(this).children('.tooltip').show()
})
$('body').on('mouseleave','.brewery.marker',function(event){
	if (!$(this).children('.tooltip').hasClass('active')){
		$(this).children('.tooltip').hide()
	}
})
$('body').on('click','.brewery.marker',function(){
	if ($(this).children('.tooltip').hasClass('active')){
		$('.tooltip').hide().removeClass('active');
	}
	else {
		$('.tooltip').hide().removeClass('active');
		$(this).children('.tooltip').show().addClass('active')
	}
})