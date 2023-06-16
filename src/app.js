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
  feelsLikeElement.innerHTML = `Feels Like: ${feelsLike}˚C`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${windspeed} km/hr`;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML =
    Math.round(response.data.temperature.current) + "˚C";
}

let key = "e9ebt40ac8468b03ff07a7b93c22oc3b";
let query = "London";
let units = "metric";
let url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=${units}`;
axios.get(url).then(displayTemp);
