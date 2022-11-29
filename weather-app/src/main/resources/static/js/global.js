window.addEventListener("DOMContentLoaded", (e) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const latitude = urlParams.get("lat");
  const longitude = urlParams.get("lon");

  callTimeZoneDatabase(latitude, longitude);
});

function callTimeZoneDatabase(latitude, longitude) {
  const ajaxRequest = new XMLHttpRequest();

  ajaxRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responseJson = JSON.parse(this.responseText);
      const localDate = responseJson.formatted.substr(0, 10);
      const localTime = responseJson.formatted.substr(11, 18);

      handleTime(localDate, localTime);
    }
  };
  ajaxRequest.open(
    "GET",
    `http://api.timezonedb.com/v2.1/get-time-zone?key=7ZM03JHT7YH5&by=position&lat=${latitude}&lng=${longitude}&format=json`,
    true
  );
  ajaxRequest.send();
}

function handleTime(localDate, localTime) {
  const localTimeToCalc = localTime.replaceAll(":", "");
  console.log(parseInt(localTimeToCalc));
}
