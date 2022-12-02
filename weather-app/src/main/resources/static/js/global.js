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

      handleTime(responseJson);
    }
  };
  ajaxRequest.open(
    "GET",
    `http://api.timezonedb.com/v2.1/get-time-zone?key=7ZM03JHT7YH5&by=position&lat=${latitude}&lng=${longitude}&format=json`,
    true
  );
  ajaxRequest.send();
}

function handleTime(responseJson) {
  // const localDate = responseJson.formatted.substr(0, 10);
  const localTime = responseJson.formatted.substr(11, 18).replaceAll(":", "");
  const localTimeFormatted = parseInt(localTime);

  console.log(localTimeFormatted);

  setBackground(localTimeFormatted);
}

function setBackground(localTimeFormatted) {
  const appContainer = document.querySelector(".app-container");

  // set background sunrise
  switch (localTimeFormatted) {
    case localTimeFormatted >= 080000 && localTimeFormatted < 110000:
      appContainer.style.background =
        "linear-gradient(0deg, #eeedff 0%, #aec1ff 50%, #787aff 100%)";
      break;
    case localTimeFormatted >= 110000 && localTimeFormatted < 150000:
      appContainer.style.background =
        "linear-gradient(0deg, #eeedff 0%, #aec1ff 50%, #787aff 100%)";
      break;
    case localTimeFormatted >= 150000 && localTimeFormatted < 180000:
      appContainer.style.background =
        "linear-gradient(0deg, #ffdac2 0%, #fc7a41 50%, #ff6100 100%)";
      break;
    case localTimeFormatted >= 180000 && localTimeFormatted < 210000:
      appContainer.style.background =
        "linear-gradient(0deg, #eeedff 0%, #aec1ff 50%, #787aff 100%)";
      break;
    case localTimeFormatted >= 210000 && localTimeFormatted < 080000:
      appContainer.style.background =
        "linear-gradient(0deg, #eeedff 0%, #aec1ff 50%, #787aff 100%)";
      break;
    // default:
    //   appContainer.style.background =
    //     "linear-gradient(0deg, #eeedff 0%, #aec1ff 50%, #787aff 100%)";
    //   break;
  }

  // set background sunrise

  // set background sunrise

  // set background sunrise
}
