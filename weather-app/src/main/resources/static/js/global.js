window.addEventListener("DOMContentLoaded", (e) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const latitude = urlParams.get("lat");
  const longitude = urlParams.get("lon");

  callTimeZoneDatabase(latitude, longitude);
});

// -------------------------------------------------------------------

function callTimeZoneDatabase(latitude, longitude) {
  fetch(
    `http://api.timezonedb.com/v2.1/get-time-zone?key=7ZM03JHT7YH5&by=position&lat=${latitude}&lng=${longitude}&format=json`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error calling API");
      }
    })
    .then((data) => {
      handleTime(data);
    });
}

// -------------------------------------------------------------------

function handleTime(data) {
  // const localDate = data.formatted.substr(0, 10);
  const localTime = data.formatted.substr(11, 18).replaceAll(":", "");
  const localTimeFormatted = parseInt(localTime);

  setBackground(localTimeFormatted);
}

// -------------------------------------------------------------------

function setBackground(localTimeFormatted) {
  const appContainer = document.querySelector(".app-container");

  const sunrise = [
    localTimeFormatted >= 060000 && localTimeFormatted < 900000,
    "linear-gradient(0deg, #ffe5c1 0%, #ffb64f 50%, #ff7c1f 100%)",
  ];
  const morning = [
    localTimeFormatted >= 090000 && localTimeFormatted < 100000,
    "linear-gradient(0deg, #eeedff 0%, #aec1ff 50%, #787aff 100%)",
  ];
  const lunch = [
    localTimeFormatted >= 100000 && localTimeFormatted < 140000,
    "linear-gradient(0deg, #b9efff 0%, #3dbce3 50%, #0060cd 100%)",
  ];
  const afternoon = [
    localTimeFormatted >= 140000 && localTimeFormatted < 180000,
    "linear-gradient(0deg, #ffea82 0%, #ffbd39 50%, #ff7722 100%)",
  ];
  const evening = [
    localTimeFormatted >= 180000 && localTimeFormatted < 210000,
    "linear-gradient(0deg, #c3beff 0%, #5f80ec 50%, #0c3dae 100%)",
  ];
  const night = [
    localTimeFormatted >= 210000 && localTimeFormatted < 070000,
    "linear-gradient(0deg, #6d4cc1 0%, #341ea7 50%, #1b005f 100%)",
  ];

  if (sunrise[0]) {
    appContainer.style.background = sunrise[1];
  }
  if (morning[0]) {
    appContainer.style.background = morning[1];
  }
  if (lunch[0]) {
    appContainer.style.background = lunch[1];
  }
  if (afternoon[0]) {
    appContainer.style.background = afternoon[1];
  }
  if (evening[0]) {
    appContainer.style.background = evening[1];
  }
  if (night[0]) {
    appContainer.style.background = night[1];
  }
}
