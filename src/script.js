//show day date and time
let now = new Date();
let currentDayDate = document.querySelector("#dayDate");
let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
currentDayDate.innerHTML = ` ${weekDay[now.getDay()]}, ${month[now.getMonth()]}
 ${now.getDate()}`;
let currentTime = document.querySelector("#localTime");
currentTime.innerHTML = `
  Local time: 
  ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

//seach city
function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCity");
  let showCity = document.querySelector("#showCity");
  showCity.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

//API
function showWeather(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentDegree = document.querySelector("#degree");
  currentDegree.innerHTML = currentTemperature;
  let currentHumidity = Math.round(response.data.main.humidity);
  let Humidity = document.querySelector("#humidity");
  Humidity.innerHTML = currentHumidity;
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = currentWindSpeed;
}

function searchCity(city) {
  let apiKey = "68987c4f78ac703ea3b4c1f3b5c684ad";
  let units = "metric";
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(cityUrl).then(showWeather);
}

let search = document.querySelector("#search");
search.addEventListener("submit", showCity);

//Celcius and Fahrenheit
function toFahrenheit() {
  let degree = document.querySelector(".degree");
  degree.innerHTML = "45";
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);

function toCelcius() {
  let degree = document.querySelector(".degree");
  degree.innerHTML = "5";
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", toCelcius);

//geolocation
function showAddress() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentGeoLocation = document.querySelector("button");

currentGeoLocation.addEventListener("click", showAddress);

function handlePosition(position) {
  let latitide = position.coords.latitude;
  let longitude = position.coords.longitude;
  let geoLocationUrl = `https://us1.locationiq.com/v1/reverse.php?key=pk.8dab3fe952f4d3e9a0e95f2a89b718d2&lat=${latitide}&lon=${longitude}&format=json`;
  axios.get(geoLocationUrl).then(showGeoLocation);
}

function showGeoLocation(response) {
  console.log(response);
  let geoLocationCity = response.data.address.city;
  let geoLocationCountry = response.data.address.country;
  alert(
    `your current city is ${geoLocationCity} and country is ${geoLocationCountry} `
  );
  let identifiedAddress = document.querySelector("#showCity");
  identifiedAddress.innerHTML = geoLocationCity;
  searchCity(geoLocationCity);
}
