function CustomMarker(latlng,  map, classList,brewId, brewName) {
  this.latlng_ = latlng;
  this.classes = classList;
  this.brewName = brewName;
  this.brewid = brewId;
  // Once the LatLng and text are set, add the overlay to the map.  This will
  // trigger a call to panes_changed which should in turn call draw.
  this.setMap(map);
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
  var me = this;

  // Check if the div has been created.
  var div = this.div_;
  if (!div) {
    // Create a overlay text DIV
    div = this.div_ = document.createElement('DIV');
    // Create the DIV representing our CustomMarker
    if (this.classes == "userLocation") {
      var child = document.createElement('DIV')
      div.appendChild(child)
    }
    else {      
      console.log(this)
      div.style.cursor = 'pointer';
      var child = document.createElement('DIV')
      child.className = "tooltip"
      child.textContent = this.brewName
      div.appendChild(child)
      var button = document.createElement('i')
      button.textContent = ""
      button.className = "icon-info-sign"
      button.setAttribute('data-brewid',this.brewid)
      button.setAttribute('data-center',this.latlng_)
      child.appendChild(button)
    }
    div.className = this.classes + " marker"

    // var img = document.createElement("img");
    // img.src = "http://gmaps-samples.googlecode.com/svn/trunk/markers/circular/bluecirclemarker.png";
    //div.appendChild(img);
    google.maps.event.addDomListener(div, "click", function(event) {
      google.maps.event.trigger(me, "click");
    });

    // Then add the overlay to the DOM
    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }

  // Position the overlay 
  var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
  if (point) {
    div.style.left = point.x + 'px';
    div.style.top = point.y + 'px';
  }
};

CustomMarker.prototype.remove = function() {
  // Check if the overlay was on the map and needs to be removed.
  if (this.div_) {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

CustomMarker.prototype.getPosition = function() {
 return this.latlng_;
};

var map;
var overlay;

function addOverlay() {
  overlay.setMap(map);
}

function removeOverlay() {
  overlay.setMap(null);
}