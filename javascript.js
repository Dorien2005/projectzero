let display_A = document.getElementById("location_A");
let display_B = document.getElementById("location_B");
let display_distance = document.getElementById("distance");
let cached_coords = [];
enableHighAccuracy: true;

function getLocation(var1)  {
  navigator.geolocation.getCurrentPosition(function (position) {
      showPosition(position, var1);
  });
}

function showPosition(position, var1) {
  if (var1 === 0) {
    display_A.innerHTML = "A:" + "<br>Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    cached_coords[0] = [position.coords.latitude, position.coords.longitude]
  }
  else if (var1 === 1)  {
    display_B.innerHTML = "B:" + "<br>Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    cached_coords[1] = [position.coords.latitude, position.coords.longitude];
  }
}

function getDistance(lat1, lat2, lon1, lon2)  {
  let RadiusEarth = 6371;
	let dLat = (lat2-lat1) * Math.PI / 180;
	let dLon = (lon2-lon1) * Math.PI / 180;
	let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	let distance = RadiusEarth * c;

  if (distance < 1)  {
    display_distance.innerHTML = "distance: <br>" + distance * 1000 + " m";
  }
  else {
    display_distance.innerHTML = "distance: <br>" + distance + " km";
  }
}
