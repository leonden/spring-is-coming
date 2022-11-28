window.addEventListener("DOMContentLoaded", (e) => {
  getParameterValues();
  // TODO set name
  // TODO make ajax call against the openweather API
});

function getParameterValues(parameter) {
  // TODO read get parameters from url

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  urlParams.forEach((parameterValue) => {
    urlParams.get(parameterValue);
    console.log(parameterValue);
  });
}

function callOpenweathermap() {
  const ajaxRequest = new XMLHttpRequest();

  ajaxRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responseJson = JSON.parse(this.responseText);

      // const location = document.querySelector("#data-location");
      // const temperature = document.querySelector("#data-temperature");
      // const sky = document.querySelector("#data-sky");
      // const feelsLike = document.querySelector("#data-feels-like");
      // const humidity = document.querySelector("#data-humidity");
      // const windSpeed = document.querySelector("#data-wind-speed");
    }
  };
  ajaxRequest.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?lat=LATITUDE&lon=LONGITUDE&units=metric&appid=1688017c7157a368a1d6a854d3a9ce02`,
    true
  );
  ajaxRequest.send();
}
