// 1 clock/date/time
let now = new Date();

console.log(now);
console.log(now.getMilliseconds());
console.log(now.getDay());
console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getHours());
console.log(now.getMinutes());

let hours = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23"
];
let hour = hours[now.getHours()];
let mins = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60"
];
let min = mins[now.getMinutes()];
let time = hour + ":" + min;

let date = now.getDate() + "th";
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

let small = document.querySelector("small");

small.innerHTML = `${time} ${day} ${month} ${date} ${year}`;

//2 cityForm

function searchWeather(city) {
  let apiKey = "1e7103a4d94dac75ab71913871657699";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let h2 = document.querySelector("h2");
  if (cityInput.value) {
    h2.innerHTML = `${cityInput.value}`;
    searchWeather(cityInput.value);
  } else {
    h2.innerHTML = null;
  }
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "1e7103a4d94dac75ab71913871657699";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
//tempChange

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#tempChange");
  temperatureElement.innerHTML = `${temperature}°C`;
  let city = response.data.name;
  let changeCityElement = document.querySelector("h2");
  changeCityElement.innerHTML = `${city}`;
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let displayPosition = document.querySelector("p2");
  displayPosition.innerHTML = `Latitude = ${lat} & Longitude = ${lon}`;

  function tempChangeC(event) {
    let celsius = `${temperature}°C`;
    let temp = document.querySelector("#tempChange");
    temp.innerHTML = `${celsius}`;
  }
  let tempChange = document.querySelector("#cbutton");
  tempChange.addEventListener("click", tempChangeC);

  function tempChangeF(event) {
    let fahreinheight = Math.round((temperature * 9) / 5 + 32);
    let temp2 = document.querySelector("#tempChange");
    temp2.innerHTML = `${fahreinheight}°F`;
  }

  let tempChange2 = document.querySelector("#fbutton");
  tempChange2.addEventListener("click", tempChangeF);
}

//5geoLocation button

function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentPosition);
