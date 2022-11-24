window.addEventListener("DOMContentLoaded", (e) => {
  const searchInput = document.querySelector(".search");

  searchInput.addEventListener("keyup", (e) => {
    let searchInputValue = searchInput.value;

    if (searchInputValue.length >= 3) {
      callGeocoder(searchInputValue);
    }
  });
});

function callGeocoder(searchInputValue) {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responseJson = JSON.parse(this.responseText);
      for (let item in responseJson) {
        console.log(responseJson[item]);
      }
    }
  };
  xhttp.open(
    "GET",
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchInputValue}&limit=3&appid=1688017c7157a368a1d6a854d3a9ce02`,
    true
  );
  xhttp.send();
}
