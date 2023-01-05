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
  const localTime = data.formatted.substr(11, 18).replaceAll(":", "");
  const localTimeFormatted = parseInt(localTime);
  const localHour = parseInt(retrieveLocalHour(localTimeFormatted));

  setBackground(localHour);
}

// -------------------------------------------------------------------

function retrieveLocalHour(localTimeFormatted) {
  const time = localTimeFormatted;

  if (time.toString().length === 5) {
    return time.toString().substr(0, 1);
  } else if (time.toString().length === 6) {
    return time.toString().substr(0, 2);
  }
}

// -------------------------------------------------------------------

function setBackground(localHour) {
  const appContainer = document.querySelector(".app-container");

  // order: sunrise, morning, lunch, afternoon, evening, night, night
  const dayTime = [
    localHour >= 7 && localHour < 9,
    localHour >= 9 && localHour < 10,
    localHour >= 10 && localHour < 14,
    localHour >= 14 && localHour < 18,
    localHour >= 18 && localHour < 21,
    localHour >= 21 && localHour <= 24,
    localHour >= 0 && localHour < 7,
    "linear-gradient(0deg, #ffe5c1 0%, #ffb64f 50%, #ff7c1f 100%)",
    "linear-gradient(0deg, #eeedff 0%, #aec1ff 50%, #787aff 100%)",
    "linear-gradient(0deg, #b9efff 0%, #3dbce3 50%, #0060cd 100%)",
    "linear-gradient(0deg, #ffea82 0%, #ffbd39 50%, #ff7722 100%)",
    "linear-gradient(0deg, #c3beff 0%, #5f80ec 50%, #0c3dae 100%)",
    "linear-gradient(0deg, #6d4cc1 0%, #341ea7 50%, #1b005f 100%)",
  ];

  if (dayTime[0]) {
    appContainer.style.background = dayTime[7];
  }
  if (dayTime[1]) {
    appContainer.style.background = dayTime[8];
  }
  if (dayTime[2]) {
    appContainer.style.background = dayTime[9];
  }
  if (dayTime[3]) {
    appContainer.style.background = dayTime[10];
  }
  if (dayTime[4]) {
    appContainer.style.background = dayTime[11];
  }
  if (dayTime[5] || dayTime[6]) {
    appContainer.style.background = dayTime[12];
  }
}
