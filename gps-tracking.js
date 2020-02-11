const start_button = document.getElementById("start");
const pause_button = document.getElementById("pause");
const stop_button = document.getElementById("stop");

const open_close = document.getElementById("open-close");

const interface_container = document.getElementById("interface");
const button_container = document.getElementById("button-container");

const time_text = document.getElementById("timer");
const distance_text = document.getElementById("distance");


//array of saved positions
const positions = [];

let startTimer;
let startTracking;

let distance;
let time;


start_button.addEventListener("click", start);


function  start() {
  //save starting position
  navigator.geolocation.getCurrentPosition(function(position) {
    positions.push(position);
  });

  setupInterface();

  //start tracking location
  distance = 0;
  startTracking = navigator.geolocation.watchPosition(function(position)  {
    positions.push(position);

    let position1 = positions[positions.length - 2];
    let position2 = positions[positions.length - 1];
    console.log(positions, position1, position2);
    distance += getDistance(position1.coords.latitude, position2.coords.latitude, position1.coords.longitude, position2.coords.longitude);

    updateDistance(distance);
  });

  //start timer
  time = 0;
  startTimer = setInterval(function() {
    //update time by 1 each second
    time += 1;

    updateTimer(time);
  }, 1000);
}

function  pause() {
  clearInterval(startTimer);
  navigator.geolocation.clearWatch(startTracking);

  pause_button.removeEventListener("click", pause);

  pause_button.innerHTML = "Ga door";
  pause_button.addEventListener("click", resume);
}

function resume() {
  startTracking = navigator.geolocation.watchPosition(function(position)  {
    positions.push(position);

    let position1 = positions[positions.length - 2];
    let position2 = positions[positions.length - 1];
    console.log(positions, position1, position2);
    distance += getDistance(position1.coords.latitude, position2.coords.latitude, position1.coords.longitude, position2.coords.longitude);

    updateDistance(distance);

    pause_button.removeEventListener("click", resume);

    pause_button.innerHTML = "Pauzeer";
    pause_button.addEventListener("click", pause);
  });

  startTimer = setInterval(function() {
    //update time by 1 each second
    time += 1;

    updateTimer(time);
  }, 1000);
}


function  stop() {
  clearInterval(startTimer);
  navigator.geolocation.clearWatch(startTracking);

  start_button.style.display = "block";

  pause_button.style.transition = ".4s";
  pause_button.style.left = "-650px";

  stop_button.style.transition = ".4s";
  stop_button.style.left = "-400px";

  open_close.style.transition = ".4s";
  open_close.style.right = "-50px";

  interface_container.style.height = "0";
  button_container.style.bottom = "0";


  time_text.innerHTML = "00:00:00";
  distance_text.innerHTML = "0m afgelegd"
}


function setupInterface() {
  interface_container.style.height = "200px";
  button_container.style.bottom = "200px";

  pause_button.addEventListener("click", pause);
  stop_button.addEventListener("click", stop);
  open_close.addEventListener("click", closeInterface);

  //remove start button

  pause_button.style.display = "block";
  pause_button.style.left = "0px";

  stop_button.style.display = "block";
  stop_button.style.left = "320px";

  open_close.style.right = "50px";


  setTimeout(function() {
    pause_button.style.transition = "0s";
    stop_button.style.transition = "0s";
    open_close.style.transition = "0s";

    start_button.style.display = "none";
  }, 700);
}

function closeInterface() {
  interface_container.style.height = "0";
  button_container.style.bottom = "0";

  open_close.removeEventListener("click", closeInterface);
  open_close.addEventListener("click", openInterface);
  open_close.innerHTML = "&#x25B2;";
}

function openInterface() {
  interface_container.style.height = "200px";
  button_container.style.bottom = "200px";

  open_close.removeEventListener("click", openInterface);
  open_close.addEventListener("click", closeInterface);
  open_close.innerHTML = "&#x25BC;";
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


function saveData() {

}
