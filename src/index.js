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

  // Fetch and display 7-day forecast for the same city
  getForecast(response.data.coordinates.latitude, response.data.coordinates.longitude);
}

function getForecast(lat, lon) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;

  axios.get(forecastUrl).then(function (response) {
    displayForecast(response.data.daily);
  }).catch(function () {
    console.log("Forecast fetch failed");
  });
}

function displayForecast(dailyForecast) {
  let forecastHtml = "";
  let forecastElement = document.querySelector("#forecast");
  if (!forecastElement) return;

  dailyForecast.slice(0, 7).forEach(function (dayData) {
    let date = new Date(dayData.time * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayName = days[date.getDay()];
    let iconUrl = dayData.condition.icon_url;
    let maxTemp = Math.round(dayData.temperature.maximum);
    let minTemp = Math.round(dayData.temperature.minimum);

    forecastHtml += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${dayName}</div>
        <img src="${iconUrl}" alt="Weather icon" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <strong>${maxTemp}º</strong> / ${minTemp}º
        </div>
      </div>
    `;
  });

  forecastElement.innerHTML = forecastHtml;
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
  let apiKey = "3594o0ecd215cb354fba04fbb4c0bt7f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather).catch(() => {
    alert("City not found. Please try another city.");
  });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  if (searchInput.value.trim() !== "") {
    searchCity(searchInput.value);
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
    video.src = "sunny.mp4";
  } else if (weatherLower.includes("cloud")) {
    video.src = "clouds.mp4";  
  } else {
    video.src = "clouds.mp4";
  }
}
