const WEATHER_URL = "/src/main/resources/templates/weather.html";

window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search");

  searchInput.addEventListener("keyup", () => {
    let searchInputValue = searchInput.value;
    document.getElementById("matches").innerHTML = "";
    searchInput.style.borderRadius = "40px";

    if (searchInputValue.length >= 3) {
      callGeocoder(searchInputValue);
    }
  });
});

function callGeocoder(searchInputValue) {
  const searchInput = document.querySelector(".search");

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchInputValue}&limit=3&appid=1688017c7157a368a1d6a854d3a9ce02`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error calling API");
      }
    })
    .then((data) => {
      if (data.length != 0) {
        searchInput.style.borderRadius = "20px 20px 0 0";

        data.forEach((locationItem) => {
          createMatches(
            locationItem.name,
            locationItem.state,
            locationItem.country,
            locationItem.lat,
            locationItem.lon
          );
        });
      } else {
        searchInput.style.borderRadius = "40px";
      }
    });
}

function createMatches(matchText, state, country, latitude, longitude) {
  let url = `${WEATHER_URL}?city=${matchText}&lat=${latitude}&lon=${longitude}`;
  let tag = document.createElement("a");
  let text = document.createTextNode(`${matchText}, ${state} ${country}`);
  let href = document.createAttribute("href");
  href.value = url;
  tag.appendChild(text);
  tag.setAttributeNode(href);
  let element = document.getElementById("matches");
  element.appendChild(tag);
}
