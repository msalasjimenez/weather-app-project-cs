function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentday = days[date.getDay()];

  let currenthour = date.getHours();
  if (currenthour < 10) {
    currenthour = `0${currenthour}`;
  }

  let currentminutes = date.getMinutes();
  if (currentminutes < 10) {
    currentminutes = `0${currentminutes}`;
  }

  let formatdates = `${currentday}, ${currenthour}:${currentminutes},`;

  return formatdates;
}

function displayWeatherCondition(response) {
  let cityresult = document.querySelector("#city");
  let citytemp = document.querySelector("#temp");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiustemperature = response.data.temperature.current;

  citytemp.innerHTML = Math.round(celsiustemperature);
  cityresult.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function searchcity(city) {
  let apiKey = "4031af3089baee44t6720aff433o521e";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function search(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#search-city-input");
  searchcity(searchinput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

searchcity("Cartagena de Indias");
