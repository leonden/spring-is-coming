window.addEventListener("DOMContentLoaded", (e) => {});

function callTimeZoneDatabase() {
  const ajaxRequest = new XMLHttpRequest();

  ajaxRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responseJson = JSON.parse(this.responseText);
    }
  };
  ajaxRequest.open(
    "GET",
    `http://api.timezonedb.com/v2.1/get-time-zone?key=7ZM03JHT7YH5&lat=47.5581077&lng=7.5878261`,
    true
  );
  ajaxRequest.send();
}
