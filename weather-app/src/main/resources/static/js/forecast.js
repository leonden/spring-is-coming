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
        console.error("Error calling API");
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
  let forecastJson = handleForecastResponse(responseArray);

  title.innerHTML = `The next four days in ${city}`;

  for (let i = 0; i < forecastJson.length; i++) {
    forecastDayArray[i].innerHTML =
      Math.round(forecastJson[i].main.temp) + "&#176;C";
  }

  handleImages(responseArray);
}

function handleImages(responseArray) {
  const dayOne = document.querySelector("#data-forecast-img-1");
  const dayTwo = document.querySelector("#data-forecast-img-2");
  const dayThree = document.querySelector("#data-forecast-img-3");
  const dayFour = document.querySelector("#data-forecast-img-4");
  const dayFive = document.querySelector("#data-forecast-img-5");

  const forecastDayArray = [dayOne, dayTwo, dayThree, dayFour, dayFive];

  const forecastItems = [
    {
      desc: "Sun",
      imgPath: "../static/assets/sun.png",
    },
    {
      desc: "Clouds",
      imgPath: "../static/assets/cloudy.png",
    },
    {
      desc: "Snow",
      imgPath: "../static/assets/snow.png",
    },
    {
      desc: "Rain",
      imgPath: "../static/assets/rain.png",
    },
    {
      desc: "Extreme",
      imgPath: "../static/assets/storm.png",
    },
  ];

  let weatherDescription = [];

  for (let i = 0; i < forecastDayArray.length; i++) {
    getWeatherDescription(responseArray[i], weatherDescription);
  }

  console.log(weatherDescription);

  appendImage(forecastDayArray, weatherDescription, forecastItems);
}

function appendImage(forecastDayArray, weatherDescription, forecastItems) {
  for (let i = 0; i < forecastDayArray.length; i++) {
    if (weatherDescription[i] === forecastItems[i].desc) {
      console.log(forecastItems[i].imgPath);
    }

    switch (weatherDescription[i]) {
      case forecastItems[0].desc:
        console.log(forecastItems[0].imgPath);
        break;
      case forecastItems[1].desc:
        console.log(forecastItems[1].imgPath);
        break;
      case forecastItems[2].desc:
        console.log(forecastItems[2].imgPath);
        break;
      case forecastItems[3].desc:
        console.log(forecastItems[3].imgPath);
        break;
      case forecastItems[4].desc:
        console.log(forecastItems[4].imgPath);
        break;
    }

    // let href = document.createAttribute("href");
    // href.value = url;
    // tag.appendChild(text);
    // tag.setAttributeNode(href);
    // let element = document.getElementById("matches");
    // element.appendChild(tag);
  }
}

function getWeatherDescription(responseArray, weatherDescription) {
  let responseItem = responseArray;

  weatherDescription.push(responseItem.weather[0].main);
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
