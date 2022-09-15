function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Show more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Show less";
    moreText.style.display = "inline";
  }
}

const drawTable = (data) => {
  const tbody = document.getElementById("tbody");

  data.forEach((symbolData) => {
    // console.log("here", symbolData);
    const tr = document.createElement("tr");
    tr.className = "table-primary";

    const td1 = document.createElement("td");
    td1.innerHTML = symbolData.symbol;

    const td2 = document.createElement("td");
    td2.innerHTML = symbolData.highPrice;

    const td3 = document.createElement("td");
    td3.innerHTML = symbolData.lowPrice;

    const td4 = document.createElement("td");
    td4.innerHTML = symbolData.priceChange;

    const td5 = document.createElement("td");
    td5.innerHTML = symbolData.priceChangePercent;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tbody.appendChild(tr);
  });
};

const clearTable = () => {
  document.getElementById("tbody").removeChild();
};

const getPriceDataFromBinance = async (symbols) => {
  let fetchedData;
  const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbols}`;

  await fetch(url).then((result) => {
    fetchedData = result.json();
  });

  return fetchedData;
};

getPriceDataFromBinance(
  '["BTCUSDT","BNBUSDT","ETHUSDT","ADAUSDT","SOLBTC","DOGEUSDT","ETHBTC"]'
).then((symbolsData) => {
  drawTable(symbolsData);
  let filteredSymbolsData = [];

  // fire on every keyboard input
  document.querySelector("#search-text").addEventListener("input", (e) => {
    const userInput = e.target.value;

    if (userInput === "") {
      drawTable(symbolsData);
      return;
    }

    filteredSymbolsData = symbolsData.filter(
      (symbolData) =>
        symbolData.symbol.toLowerCase() === userInput.toLowerCase()
    );
    // console.log(filteredSymbolsData);
    clearTable();
    drawTable(filteredSymbolsData);
  });
});
