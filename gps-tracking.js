const start_button = document.getElementById("start");
const interface_container = document.getElementById("interface");
const time_text = document.getElementById("time");
const distance_text = document.getElementById("distance");
const button_container = document.getElementById("button-container");
//array of saved positions
const positions = [];


start_button.addEventListener("click", start);

function  start() {
  //save starting position
  navigator.geolocation.getCurrentPosition(function(position) {
    positions.push(position);
  });

  setupInterface();

  //start tracking location
  let distance = 0;
  const startTracking = navigator.geolocation.watchPosition(function(position)  {
    positions.push(position);

    let position1 = positions[positions.length - 2];
    let position2 = positions[positions.length - 1];
    console.log(positions, position1, position2);
    distance += getDistance(position1.coords.latitude, position2.coords.latitude, position1.coords.longitude, position2.coords.longitude);

    updateDistance(distance);
  });

  //start timer
  let time = 0;
  const startTimer = setInterval(function() {
    //update time by 1 each second
    time += 1;

    updateTimer(time);
  }, 1000);
}

function getDistance(lat1, lat2, lon1, lon2) {
  const R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLon = deg2rad(lon2-lon1);
  let a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km

  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


function updateDistance(distance) {
  if (distance < 1) {
    distance_text.innerHTML = Math.round(distance * 1000) + " m afgelegd";
  }
  else {
    distance_text.innerHTML = Math.round(distance) + " km afgelegd";
  }
}

function updateTimer(time) {
  let hours = Math.floor(time / 3600);
  if (hours < 10) {
    hours = "0" + hours;
  }

  let minutes = Math.floor(time / 60);
  minutes -= hours * 60;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let seconds = time;
  seconds -= hours * 3600;
  seconds -= minutes * 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  time_text.innerHTML = hours + ":" + minutes + ":" + seconds;
}
