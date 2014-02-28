var marker;
var geocoder;
var map;
function initialize() 
{
	geocoder = new google.maps.Geocoder();
	var ucsdCenter=new google.maps.LatLng(32.878171, -117.2391);
  	var mapProp = {
    center:ucsdCenter,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), mapProp);
/////// Maker on Map //////
  marker=new google.maps.Marker({
  	position:ucsdCenter,
  	animation:google.maps.Animation.DROP,
  	draggable:true,
  });
  google.maps.event.addListener(marker, 'click', toggleBounce);
  marker.setMap(map);

////// Info Window on Maker //////

	var infowindow = new google.maps.InfoWindow({
	  content:"Center of UCSD"
	  });

	google.maps.event.addListener(marker, 'click', function() {
  		infowindow.open(map,marker);
  	});
}

google.maps.event.addDomListener(window, 'load', initialize);

function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function codeAddress() {
  var address = document.getElementById("address").value;
  //var addressB = document.getElementById("addressB").value;
  //var addressC = document.getElementById("addressC").value;
  geocoder.geocode( { "address": address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.setZoom(16);
      var newmarker1 = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
      });
    } 
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

  /*geocoder.geocode( { "addressB": addressB}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.setZoom(16);
      var newmarker2 = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
      });
    } 
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

  geocoder.geocode( { "addressC": addressC}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.setZoom(16);
      var newmarker3 = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
      });
    } 
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });*/
}