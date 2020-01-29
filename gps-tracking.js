const start_button = document.getElementById("start_button");
const interface_container = document.getElementById("interface_container");

//array of saved positions
const positions = [];
//time in seconds
let time = 0;

start_button.addEventListener("click", start);

function  start() {
  navigator.geolocation.getCurrentPosition(saveStart);

  displayInterface();

  //start tracking location and time
  navigator.geolocation.watchCurrentPosition();
  const timer = setInterval(function()  {
    time += 1;
  }, 1000);

}

function saveStart() {
  const start = position;
}

function updateStats() {
  positions.push(position);
}

function updateTime() {
  time += 1;
}
