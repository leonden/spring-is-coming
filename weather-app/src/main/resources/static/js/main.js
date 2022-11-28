const WEATHER_URL = "/src/main/resources/templates/weather.html";

window.addEventListener("DOMContentLoaded", (e) => {
  const searchInput = document.querySelector(".search");

  searchInput.addEventListener("keyup", (e) => {
    let searchInputValue = searchInput.value;
    document.getElementById("matches").innerHTML = "";

    if (searchInputValue.length >= 3) {
      callGeocoder(searchInputValue);
    }
  });
});

function callGeocoder(searchInputValue) {
  const ajaxRequest = new XMLHttpRequest();

  ajaxRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responseJson = JSON.parse(this.responseText);
      document.getElementById("matches").innerHTML = "";

      responseJson.forEach((locationItem) => {
        createMatches(locationItem.name, locationItem.lat, locationItem.lon);
      });
    }
  };
  ajaxRequest.open(
    "GET",
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchInputValue}&limit=3&appid=1688017c7157a368a1d6a854d3a9ce02`,
    true
  );
  ajaxRequest.send();
}

function createMatches(matchText, latitude, longitude, linkToPage) {
  let url = `${WEATHER_URL}?city=${matchText}&lat=${latitude}&lon=${longitude}`;
  // Creates object with a tag name
  let tag = document.createElement("a");
  // Creates the text (content)
  let text = document.createTextNode(matchText);
  // Creates the attribute
  let href = document.createAttribute("href");
  href.value = url;
  // Adds content to the tag
  tag.appendChild(text);
  // Adds attribute to the tag
  tag.setAttributeNode(href);
  // Adds tag to the parentTag
  let element = document.getElementById("matches");
  element.appendChild(tag);
}
