const WEATHER_URL = "/src/main/resources/templates/forecast.html";

window.addEventListener("DOMContentLoaded", (e) => {
  getParameterValues();
});

function getParameterValues() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const city = urlParams.get("city");
  const latitude = urlParams.get("lat");
  const longitude = urlParams.get("lon");

  callOpenweathermap(latitude, longitude);
  createLinkToForecast(city, latitude, longitude);

  // urlParams.forEach((parameterValue) => {
  //   urlParams.get(parameterValue);
  //   console.log(parameterValue);
  // });
}

function callOpenweathermap(latitude, longitude) {
  const ajaxRequest = new XMLHttpRequest();

  ajaxRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responseJson = JSON.parse(this.responseText);

      // get all the necessary elements from the DOM
      const location = document.querySelector("#data-location");
      const temperature = document.querySelector("#data-temperature");
      const sky = document.querySelector("#data-sky");
      const feelsLike = document.querySelector("#data-feels-like");
      const humidity = document.querySelector("#data-humidity");
      const windSpeed = document.querySelector("#data-wind-speed");

      // set the values of the elements
      location.innerHTML = responseJson.name;
      temperature.innerHTML = Math.round(responseJson.main.temp) + "&#176;C";
      sky.innerHTML = responseJson.weather[0].main;
      feelsLike.innerHTML =
        Math.round(responseJson.main.feels_like) + "&#176;C";
      humidity.innerHTML = responseJson.main.humidity + "%";
      windSpeed.innerHTML = Math.round(responseJson.wind.speed) + "km/h";
    }
  };
  ajaxRequest.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=1688017c7157a368a1d6a854d3a9ce02`,
    true
  );
  ajaxRequest.send();
}

function createLinkToForecast(city, latitude, longitude) {
  const forecastLink = document.querySelector("#btn-forecast");
  let url = `${WEATHER_URL}?city=${city}&lat=${latitude}&lon=${longitude}`;
  let href = document.createAttribute("href");
  href.value = url;
  forecastLink.setAttributeNode(href);
}
