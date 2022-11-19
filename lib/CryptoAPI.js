const axios = require("axios");
const colors = require("colors");

class CryptoAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.nomics.com/v1/currencies/ticker";
  }

  async getPriceData(coinOption, currOption) {
    try {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currOption,
      });

      const res = await axios.get(
        `${this.baseUrl}?key=${this.apiKey}&ids=${coinOption}&convert=${currOption}`
      );

      let output = "";

      res.data.forEach((coin) => {
        output += `Coin: ${coin.symbol.yello} (${coin.name}) | Price: ${
          formatter.format(coin.price).green
        } | Rank: ${coin.rank.blue}\n`;
      });
    } catch (error) {
      handleAPIError(error);
    }
  }
}

function handleAPIError(error) {
  if (error.response.status === 401) {
    throw new Error("Your API key is invalid - Go to https://nomics.com");
  } else if (error.response.status === 404) {
    throw new Error("API is not responding. Try again later.");
  } else {
    throw new Error("Something went wrong!. Try again later.");
  }
}

module.exports = CryptoAPI;
