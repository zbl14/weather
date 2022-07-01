export class GiphyService {  
  static async getGif(query) {
    try {
      const response = await fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${process.env.GIPHY_API_KEY}&limit=5`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      return error.message;
    } 
  }
}