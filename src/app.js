function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day} ${hours}:${minutes}`;
}

function displayTemp(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let windspeed = Math.round(response.data.wind.speed);
  let humidity = response.data.temperature.humidity;
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let feelsLikeElement = document.querySelector("#feels-like");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  feelsLikeElement.innerHTML = `Feels Like: ${feelsLike}˚C`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${windspeed} km/hr`;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML =
    Math.round(response.data.temperature.current) + "˚C";
}

function search(query) {
  let key = "e9ebt40ac8468b03ff07a7b93c22oc3b";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=${units}`;
  axios.get(url).then(displayTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let key = "e9ebt40ac8468b03ff07a7b93c22oc3b";
let units = "metric";
let query = "Barcelona";
let url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=${units}`;
axios.get(url).then(displayTemp);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
