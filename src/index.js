function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  // Update background video based on weather condition
  setBackground(response.data.condition.main);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml +=
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  if (forecastElement) {
    forecastElement.innerHTML = forecastHtml;
  }
}

const greetings = {
  en: "Hi there 👋🏽",
  fr: "Bonjour 👋🏽",
  es: "¡Hola 👋🏽",
  zu: "Sawubona 👋🏽",
  pt: "Olá 👋🏽",
  sw: "Habari 👋🏽"
};

function updateGreeting() {
  const selectedLang = document.getElementById("language-select").value;
  const greeting = greetings[selectedLang] || "Hi there 👋🏽";
  document.getElementById("greeting").textContent = greeting;
}

document.getElementById("language-select").addEventListener("change", updateGreeting);


updateGreeting();

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Initial load for weather and forecast
searchCity("Paris");
displayForecast();

const video = document.getElementById("bg-video");

function setBackground(weather) {
  if (!weather) {
    video.src = "clouds.mp4";
    return;
  }

 
  const weatherLower = weather.toLowerCase();

  if (weatherLower.includes("rain")) {
    video.src = "cloudy.mp4";
  } else if (weatherLower.includes("clear") || weatherLower.includes("sunny")) {
    video.src = "sunny.mp4";  // make sure this file exists in your folder
  } else if (weatherLower.includes("cloud")) {
    video.src = "clouds.mp4";  // make sure this file exists too
  } else {
    video.src = "clouds.mp4";
  }
}
