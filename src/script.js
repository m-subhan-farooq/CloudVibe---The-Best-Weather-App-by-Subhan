
// const city = 'Lahore';


// const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     const temperature = data.current.temp_c;  
//     const condition = data.current.condition.text;  
//     const humidity = data.current.humidity
//     const wind = data.current.wind_mph
//     const weather_icon = data.current.condition.icon

//     document.querySelector(".temp").innerText = temperature + "° C"
//     document.querySelector(".condition").innerText = condition
//     document.querySelector(".humidity").innerText = humidity + "%"
//     document.querySelector(".wind").innerText = wind
//     document.querySelector(".weather-icon").innerHTML = `<img src="${weather_icon}" alt="">`
//   })
//   .catch(error => {
//     console.error('Error fetching the weather data:', error);
//   });

const apiKey = "7e37da0056b64044ac2154013240509";

// Function to get the user's location
function getLocationAndWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Fetch weather data using the user's coordinates
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            const country = data.location.name
            const temperature = data.current.temp_c;
            const condition = data.current.condition.text;
            const humidity = data.current.humidity;
            const wind = data.current.wind_mph;
            const weather_icon = data.current.condition.icon;

            // Update the UI with the fetched data
            document.querySelector(".country").innerText = country
            document.querySelector(".temp").innerText = temperature + "° C";
            document.querySelector(".condition").innerText = condition;
            document.querySelector(".humidity").innerText = humidity + "%";
            document.querySelector(".wind").innerText = wind;
            document.querySelector(".weather-icon").innerHTML = `<img src="${weather_icon}" alt="">`;
          })
          .catch(error => {
            console.error('Error fetching the weather data:', error);
          });
      },
      error => {
        console.error('Error getting geolocation:', error);
        document.querySelector(".condition").innerText = "Unable to retrieve location.";
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Call the function when the page loads
getLocationAndWeather();
