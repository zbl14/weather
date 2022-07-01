export class WeatherService {
  static async getWeather(query) {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }

  static async get5D3HForecast(query) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}


