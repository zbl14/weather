import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(() => {
  $('#weatherLocation').click(() => {
    const city = $('#location').val();
    const zipcode = $('#zipcode').val();
    $('#location').val("");
    $('#zipcode').val("");

    let request = new XMLHttpRequest();
    let request1 = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
    const urlZipcode = `https://api.openweathermap.org/data/2.5/weather?q=${zipcode}&appid=${process.env.API_KEY}`;
    const urlForcastByCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        console.log(response);
        /* eslint-disable */
        getElements(response);
        /* eslint-enable */
      }
    };

    request1.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response1 = JSON.parse(this.responseText);
        console.log(response1);
        /* eslint-disable */
        getElements1(response1);
        /* eslint-enable */
      }
    };

    if (city !== "" && zipcode === "") {
      request.open("GET", url, true);
      console.log(city);
      request1.open("GET", urlForcastByCity, true);
    } else {
      request.open("GET",urlZipcode, true);
    }
    if (city !== "" && zipcode === "") {   
      request.send();
      request1.send()
    } else {
      request.send();
    }
    
    /* eslint-disable */
    const getElements = (response) => {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
      let fahrenheitTemp= ((`${response.main.temp}` -273.15)*(9/5))+32
      $('.showFahrenheit').text(`The temperature in Fahrenheit is ${fahrenheitTemp}`)
      $('.showLon').text(`The longitude is ${response.coord.lon}`);
      $('.showLat').text(`The latitude is ${response.coord.lat}`);
    };

    const getElements1 = (response1) => {
      $('.showHumidity3hour').text(`The humidity of next 3 hour is ${response1.list[0].main.humidity} %`);
    };
    /* eslint-enable */
  });
});