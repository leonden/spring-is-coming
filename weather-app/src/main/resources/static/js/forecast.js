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
  setTitle(city);
  appendImages(data);
  appendText(data);
}

// -------------------------------------------------------------------

function appendText(data) {
  const dayOne = document.querySelector("#data-forecast-1");
  const dayTwo = document.querySelector("#data-forecast-2");
  const dayThree = document.querySelector("#data-forecast-3");
  const dayFour = document.querySelector("#data-forecast-4");
  const dayFive = document.querySelector("#data-forecast-5");

  const forecastDayArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];

  appendTemp(data, forecastDayArray);
  // appendWeekday(data, forecastDayArray);
}

// -------------------------------------------------------------------

function appendImages(data) {
  const dayOne = document.querySelector("#data-forecast-img-1");
  const dayTwo = document.querySelector("#data-forecast-img-2");
  const dayThree = document.querySelector("#data-forecast-img-3");
  const dayFour = document.querySelector("#data-forecast-img-4");
  const dayFive = document.querySelector("#data-forecast-img-5");

  const forecastDayArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];

  forecastDayArray.forEach((day, i) => {
    let description = data[i].description;
    let assetLink = checkDescription(description);
    let src = document.createAttribute("src");

    console.log(description);
    console.log(src);

    src.value = assetLink;
    day.setAttributeNode(src);
  });
}

// -------------------------------------------------------------------

function appendTemp(data, forecastDayArray) {
  forecastDayArray.forEach((day, i) => {
    let temperature = data[i].temperature;

    day.innerHTML =
      appendWeekday(data, i) + " " + Math.round(temperature) + "&#176;C";
  });
}

// -------------------------------------------------------------------

function appendWeekday(data, i) {
  let date = new Date(data[i].date);
  let weekday = date.toString().slice(0, 3);

  return weekday;
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
    case "Clear":
      return "../static/assets/sun.png";
    case "Mist":
      return "../static/assets/mist.png";
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
