var mapOptions = {
	center: new google.maps.LatLng(startLat,startLon),
	zoom: 13,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map"),
	mapOptions);


function addBrewery(name,lat,lon,brewid) {
	var myLatlng = new google.maps.LatLng(lat,lon);
		var marker = new google.maps.Marker({
	    position: myLatlng,
	    id: brewid,
	    map: map,
	    title: name
	});
	var inOptions = {
		content: marker.title +"<button data-brewid='"+marker.id+"' data-center='"+marker.getPosition()+"' class='concept' onClick='buttonClick(event)'>Click Me</button>",
		boxStyle: {
			background: "rgba(255,255,255,.9)",
			padding: '5px',
			width: '200px',
			enableEventPropagation: true
		}
	}
	var ib = new InfoBox(inOptions);

	google.maps.event.addListener(marker, 'click', function() {
	  ib.open(map, this);	
	});

}
google.maps.event.addDomListener(window, 'resize', function() {
		google.maps.event.trigger(map, 'resize');
});

function buttonClick(event){
	$.ajax({
		url: "/breweries/"+$(event.target).attr('data-brewid'),
		success:function(data){
			$("#breweryInfo").html('<h1>'+data.name+'</h1>')
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