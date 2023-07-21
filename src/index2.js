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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
                        <div class="forecast-day">${formatDay(
                          forecastDay.time
                        )}</div>
                        <img
                          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                            forecastDay.condition.icon
                          }.png"
                          alt=""
                        />
                        <div class="temperature-max-min">
                          <span class="temp-max"
                            >🌡Max:<strong>${Math.round(
                              forecastDay.temperature.maximum
                            )}°</strong></span
                          >
                          <br />
                          <span class="temp-min"
                            >🌡Min:${Math.round(
                              forecastDay.temperature.minimum
                            )}°</strong></span
                          >
                        </div>
                      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4031af3089baee44t6720aff433o521e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coordinates);
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

function displayfahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheitTemperature = (celsiustemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displaycelsiusTemperature(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiustemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let celsiustemperature = null;

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayfahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displaycelsiusTemperature);

searchcity("Cartagena de Indias");
