function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentday = days[date.getDay()];

  let currenthour = date.getHours();
  let currentminutes = date.getMinutes();

  if (currenthour < 10) {
    currenthour = `0${currenthour}`;
  }
  if (currentminutes < 10) {
    currentminutes = `0${currentminutes}`;
  }

  let formatdates = `${currentday}, ${currenthour}:${currentminutes},`;

  return formatdates;
}

function displayWeatherCondition(response) {
  let cityresult = document.querySelector("#city");
  cityresult.innerHTML = response.data.name;
  let citytemp = document.querySelector("#temp");
  citytemp.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
}

function searchcity(city) {
  let apiKey = "4b0822e03e5faaecb402f20ed51f6384";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function search(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#search-city-input");
  let cityresult = document.querySelector("#city");
  cityresult.innerHTML = searchinput.value;
  searchcity(city);
}

function searchposition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4b0822e03e5faaecb402f20ed51f6384";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchposition);
}

let now = new Date();
let dayandtime = document.querySelector("#date");
dayandtime.innerHTML = formatDate(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentlocationbutton = document.querySelector("#current-location-button");
currentlocationbutton.addEventListener("click", getCurrentLocation);

searchcity("Cartagena de Indias");
