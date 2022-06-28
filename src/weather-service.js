export class WeatherService {
  static getWeather(city, zipcode) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
      const urlZipcode = `https://api.openweathermap.org/data/2.5/weather?q=${zipcode}&appid=${process.env.API_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      if (city !== "" && zipcode === "") {
        request.open("GET", url, true);
        // request1.open("GET", urlForcastByCity, true);
      } else {
        request.open("GET",urlZipcode, true);
      }
      if (city !== "" && zipcode === "") {   
        request.send();
        // request1.send();
      } else {
        request.send();
      }
    });
  }
}

