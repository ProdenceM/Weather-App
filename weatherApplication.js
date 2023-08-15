let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";

let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");
let locationBtn = document.getElementById("locationBtn");
let weatherCard = document.getElementById("weatherCard");
let cityNameElement = document.getElementById("cityName");
let temperatureElement = document.getElementById("temperature");

async function fetchWeatherData(city) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  let data = await response.json();
  return data;
}

function updateWeatherCard(city, temperature) {
  cityNameElement.textContent = city;
  temperatureElement.textContent = `Temperature: ${Math.round(temperature)}°C`;
  weatherCard.style.display = "block";
}

searchBtn.addEventListener("click", async () => {
  let city = cityInput.value;
  if (city) {
    const data = await fetchWeatherData(city);
    updateWeatherCard(data.name, data.main.temp);
  }
});

locationBtn.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      let data = await response.json();
      updateWeatherCard(data.name, data.main.temp);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});
