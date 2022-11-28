window.addEventListener("DOMContentLoaded", (e) => {
  getParameterValues();
  // TODO set name
  // TODO make ajax call against the openweather API
});

function getParameterValues() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const latitude = urlParams.get("lat");
  const longitude = urlParams.get("lon");

  callOpenweathermap(latitude, longitude);

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
      console.log(responseJson);

      const location = document.querySelector("#data-location");
      const temperature = document.querySelector("#data-temperature");
      const sky = document.querySelector("#data-sky");
      const feelsLike = document.querySelector("#data-feels-like");
      const humidity = document.querySelector("#data-humidity");
      const windSpeed = document.querySelector("#data-wind-speed");

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
