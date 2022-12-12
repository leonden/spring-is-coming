const WEATHER_URL = "/src/main/resources/templates/weather.html";

window.addEventListener("DOMContentLoaded", () => {
  getParameterValues();
});

function getParameterValues() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const city = urlParams.get("city");
  const latitude = urlParams.get("lat");
  const longitude = urlParams.get("lon");

  callOpenweathermapForecast(city, latitude, longitude);
  createLinkToWeather(city, latitude, longitude);
}

function callOpenweathermapForecast(city, latitude, longitude) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=1688017c7157a368a1d6a854d3a9ce02`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("error calling api");
      }
    })
    .then((data) => {
      handleDom(city, data);
    });
}

function handleDom(city, data) {
  const title = document.querySelector("#data-forecast-location");
  const dayOne = document.querySelector("#data-forecast-1");
  const dayTwo = document.querySelector("#data-forecast-2");
  const dayThree = document.querySelector("#data-forecast-3");
  const dayFour = document.querySelector("#data-forecast-4");
  const dayFive = document.querySelector("#data-forecast-5");

  const forecastDayArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];

  let responseArray = data.list;
  let forecastDayJson = handleForecastResponse(responseArray);

  title.innerHTML = `The next four days in ${city}`;
}

function handleForecastResponse(responseArray) {
  let weatherData = [];

  responseArray.forEach((forecastDay) => {
    if (forecastDay.dt_txt.endsWith("12:00:00")) {
      weatherData.push(forecastDay);
      weatherData.slice(0);
    }
  });

  return weatherData;
}

function createLinkToWeather(city, latitude, longitude) {
  const weatherLink = document.querySelector("#btn-weather");
  let url = `${WEATHER_URL}?city=${city}&lat=${latitude}&lon=${longitude}`;
  let href = document.createAttribute("href");
  href.value = url;
  weatherLink.setAttributeNode(href);
}
