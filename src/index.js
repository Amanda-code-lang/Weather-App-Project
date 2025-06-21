function refreshWeather(response) {
  console.log("🌍 Weather Data Response:", response);
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
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  setBackground(response.data.condition.description);
  console.log("🎬 Weather description for background:", response.data.condition.description);


  getForecast(response.data.city);
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
  console.log(`🔍 Searching weather for: ${city}`);
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
   console.log("📊 Forecast Data:", response);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");

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
  const greeting = greetings[selectedLang] || greetings.en;
  document.getElementById("greeting").textContent = greeting;
}


document.getElementById("language-select").addEventListener("change", updateGreeting);


updateGreeting();
function setBackground(weatherDescription) {
  

  const video = document.getElementById("bg-video");

  if (!video || !weatherDescription) return;

  const description = weatherDescription.toLowerCase();
console.log("🎞️ Setting video for weather:", description);
  if (description.includes("clear") || description.includes("sun")) {
    video.src = "sunny.mp4";
  } else if (description.includes("cloud")) {
    video.src = "clouds.mp4";
  } else if (description.includes("rain") || description.includes("drizzle")) {
    video.src = "rain.mp4";
  } else if (description.includes("snow")) {
    video.src = "snow.mp4";
  } else if (description.includes("thunder")) {
    video.src = "storm.mp4";
  } else {
    video.src = "cloudy.mp4";
  }
}
