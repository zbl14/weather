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

let currentWeather = (response) => {
  if (response.main) {
    let currentTime = new Date(`${response.dt}`*1000);
    let fahrenheitTemp = ((`${response.main.temp}` - 273.15) * (9 / 5)) + 32;
    $('.currentTime').text(`${currentTime}`);
    $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
    $('.showTemp').text(`The temperature is ${fahrenheitTemp.toFixed(2)} degrees.`);
  } else {
    $('.showErrors').text(`There was an error processing your request: ${response}`);
  }
};

let forecast5D3H = (response) => {
  if (response.list) {
    let fahrenheitTemp = ((`${response.list[0].main.temp}` - 273.15) * (9 / 5)) + 32;
    $('.showHumidity3h').text(`The humidity in the next 3 hour is ${response.list[0].main.humidity}%.`);
    $(`.showTemp3h`).text(`The temperature in the next 3 hour is is ${fahrenheitTemp.toFixed(2)} degrees.`);
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
  currentWeather(response);
  const giphy = await GiphyService.getGif(response.weather[0].description);
  showGif(giphy);
  const forecast3H = await WeatherService.get5D3HForecast(query);
  forecast5D3H(forecast3H);
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