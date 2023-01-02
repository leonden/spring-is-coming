const WEATHER_URL = "/src/main/resources/templates/weather.html";

// -------------------------------------------------------------------

window.addEventListener("DOMContentLoaded", () => {
  getParameterValues();
});

// -------------------------------------------------------------------

function getParameterValues() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const city = urlParams.get("city");
  const latitude = urlParams.get("lat");
  const longitude = urlParams.get("lon");

  callOpenweathermapForecast(city, latitude, longitude);
  createLinkToWeather(city, latitude, longitude);
}

// -------------------------------------------------------------------

function callOpenweathermapForecast(city, latitude, longitude) {
  fetch(
    `http://localhost:8080/api/v1/weather/forecast?latitude=${latitude}&longitude=${longitude}&clockTime=12:00:00`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error calling API");
      }
    })
    .then((data) => {
      console.log(data);
      handleDom(city, data);
    });
}

// -------------------------------------------------------------------

function handleDom(city, data) {
  const dayOne = document.querySelector("#data-forecast-img-1");
  const dayTwo = document.querySelector("#data-forecast-img-2");
  const dayThree = document.querySelector("#data-forecast-img-3");
  const dayFour = document.querySelector("#data-forecast-img-4");
  const dayFive = document.querySelector("#data-forecast-img-5");

  const forecastDayArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];

  setTitle(city);

  forecastDayArray.forEach((item, i) => {
    let description = data[i].description;
    let assetLink = checkDescription(description);
    let src = document.createAttribute("src");

    src.value = assetLink;
    item.setAttributeNode(src);
  });
}

// -------------------------------------------------------------------

function checkDescription(description) {
  switch (description) {
    case "Rain":
      return "../static/assets/rain.png";
    case "Clouds":
      return "../static/assets/clouds.png";
    case "Sun":
      return "../static/assets/sun.png";
    case "Snow":
      return "../static/assets/snow.png";
    case "Extreme":
      return "../static/assets/extreme.png";
  }
}

// -------------------------------------------------------------------

function setTitle(city) {
  const title = document.querySelector("#data-forecast-location");

  title.innerHTML = `The next four days in ${city}`;
}

// -------------------------------------------------------------------

function createLinkToWeather(city, latitude, longitude) {
  const weatherLink = document.querySelector("#btn-weather");
  let url = `${WEATHER_URL}?city=${city}&lat=${latitude}&lon=${longitude}`;
  let href = document.createAttribute("href");
  href.value = url;
  weatherLink.setAttributeNode(href);
}
