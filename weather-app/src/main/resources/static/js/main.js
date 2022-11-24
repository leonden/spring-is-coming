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
  const ajaxRequest = new XMLHttpRequest();

  ajaxRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responseJson = JSON.parse(this.responseText);
      for (let item in responseJson) {
        console.log(responseJson[item]);
      }
    }
  };
  ajaxRequest.open(
    "GET",
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchInputValue}&limit=3&appid=1688017c7157a368a1d6a854d3a9ce02`,
    true
  );
  ajaxRequest.send();
}

// function createMatches(matchTag, matchText, parentTag, className) {
//   // Creates object with a tag name
//   var tag = document.createElement(matchTag);
//   // Creates the text (content)
//   var text = document.createTextNode(matchText);
//   // Creates the attribute
//   var att = document.createAttribute("class");
//   att.value = className;
//   // Adds content to the tag
//   tag.appendChild(text);
//   // Adds attribute to the tag
//   tag.setAttributeNode(att);
//   // Adds tag to the parentTag
//   var element = document.getElementsByTagName(parentTag)[0];
//   element.appendChild(tag);
// }
