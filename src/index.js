import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { WeatherService } from './services/weather-service.js';
import { GiphyService } from './services/giphy-service';

let clearFields = () => {
  $('#location').val("");
  $('#zipcode').val("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
  $('.showErrors').text("");
};

let getElements = (response) => {
  if (response.main) {
    let currentTime = new Date(`${response.dt}`*1000);
    $('.currentTime').text(`${currentTime}`);
    $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
    $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    let fahrenheitTemp = ((`${response.main.temp}` - 273.15) * (9 / 5)) + 32;
    $('.showFahrenheit').text(`The temperature in Fahrenheit is ${fahrenheitTemp.toFixed(2)} degrees.`);
    $('.showLon').text(`The longitude is ${response.coord.lon}`);
    $('.showLat').text(`The latitude is ${response.coord.lat}`);
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response}`);
  }
};

let showGif = (response) => {
  if (response) {
    const url = response.data[0].images.downsized.url;
    $('.showGif').html(`<img src='${url}'>`);
  }
};

async function makeApiCall(query) {
  const response = await WeatherService.getWeather(query);
  getElements(response);
  const giphy = await GiphyService.getGif(response.weather[0].description);
  showGif(giphy);
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    let zipcode = $('#zipcode').val();
    clearFields();
    if (city !== "" && zipcode === "") {
      makeApiCall(city);
    } else {
      makeApiCall(zipcode);
    }
  });
});


// const getElements1 = (response1) => {
//   let time = new Date(`${response1.list[0].dt}`*1000)
//   $('.next3Hour').text(`${time}`)
//   $('.showHumidity3hour').text(`The humidity of next 3 hour is ${response1.list[0].main.humidity} %`);
// };

// let promise = new Promise((resolve, reject) => {
//   let request = new XMLHttpRequest();
//   const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
//   const urlZipcode = `https://api.openweathermap.org/data/2.5/weather?q=${zipcode}&appid=${process.env.API_KEY}`;
//   request.onload = function () {
//     if (this.status === 200) {
//       resolve(request.response);
//     } else {
//       reject(request.response);
//     }
//   };
//   // request.open("GET", url, true);
//   // request.send();
//   if (city !== "" && zipcode === "") {
//     request.open("GET", url, true);
//     // request1.open("GET", urlForcastByCity, true);
//   } else {
//     request.open("GET",urlZipcode, true);
//   }
//   if (city !== "" && zipcode === "") {   
//     request.send();
//     // request1.send();
//   } else {
//     request.send();
//   }
// });



// let request1 = new XMLHttpRequest();

// const urlZipcode = `https://api.openweathermap.org/data/2.5/weather?q=${zipcode}&appid=${process.env.API_KEY}`;
// const urlForcastByCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}`;

// request.onreadystatechange = function() {
//   if (this.readyState === 4 && this.status === 200) {
//     const response = JSON.parse(this.responseText);
//     console.log(response);
//     /* eslint-disable */
//     getElements(response);
//     /* eslint-enable */
//   }
// };

// request1.onreadystatechange = function() {
//   if (this.readyState === 4 && this.status === 200) {
//     const response1 = JSON.parse(this.responseText);
//     console.log(response1);
//     /* eslint-disable */
//     getElements1(response1);
//     /* eslint-enable */
//   }
// };

// if (city !== "" && zipcode === "") {
//   request.open("GET", url, true);
//   console.log(city);
//   request1.open("GET", urlForcastByCity, true);
// } else {
//   request.open("GET",urlZipcode, true);
// }
// if (city !== "" && zipcode === "") {   
//   request.send();
//   request1.send();
// } else {
//   request.send();
// }