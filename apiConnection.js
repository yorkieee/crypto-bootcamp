const data = fetch("https://api.binance.com/api/v3/exchangeInfo");
console.log(
  data.then((response) => {
    console.log(response.body);
  })
);
