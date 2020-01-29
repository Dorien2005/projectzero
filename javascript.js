let display_A = document.getElementById("location_A");
let display_B = document.getElementById("location_B");
let display_distance = document.getElementById("distance");
let cached_coords = [];
enableHighAccuracy: true;

function getLocation(text_location)  {
  navigator.geolocation.getCurrentPosition(function (position) {
    displayLocation(position, text_location);
  });
}

function displayLocation(position, text_location) {
  text_location.innerHTML = "<br>Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  cached_coords.push(position);
}

function getDistance2(lat1, lat2, lon1, lon2)  {
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

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLon = deg2rad(lon2-lon1);
  let a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km

  if (d < 1) {
    display_distance.innerHTML = d*1000 + "m";
  } else {
    display_distance.innerHTML = d + "Km";
  }
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
