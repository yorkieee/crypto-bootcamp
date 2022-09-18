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

const clearTable = () => {
  if (document.getElementById("table-body")) {
    document.getElementById("table-body").remove();
  }
};

const drawTable = (data) => {
  clearTable();

  const tbody = document.createElement("tbody");
  tbody.id = "table-body";
  document.querySelector(".table-borderless").appendChild(tbody);

  data.forEach((symbolData) => {
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

const getPriceDataFromBinance = async (symbols) => {
  let fetchedData;
  const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbols}`;

  await fetch(url).then((result) => {
    fetchedData = result.json();
  });

  return fetchedData;
};

const filterAndDrawTableBySearchText = (dataToFilter) => {
  let filteredSymbolsData = [];

  document.querySelector("#search-text").addEventListener("input", (e) => {
    const userInput = e.target.value;

    if (userInput === "") {
      drawTable(dataToFilter);

      return;
    }

    // filtering here
    filteredSymbolsData = dataToFilter.filter((symbolData) =>
      symbolData.symbol.toLowerCase().includes(userInput.toLowerCase())
    );

    drawTable(filteredSymbolsData);
  });
};

const filterAndDrawTableByRadio = (dataToFilter) => {
  let filteredSymbolsData = [];
  document.querySelector(".radio-filter").addEventListener("change", (e) => {
    const selectedValue = e.target.labels[0].innerText;

    // filtering here
    filteredSymbolsData = dataToFilter.filter((symbolData) =>
      symbolData.symbol.toLowerCase().includes(selectedValue.toLowerCase())
    );

    drawTable(filteredSymbolsData);
  });
};

const sorting = (data) => {
  let sortedData = data;

  document.querySelector("#select").addEventListener("change", (e) => {
    const selectedValue = e.target.value;

    // when ascending
    if (selectedValue === "ascending") {
      data.sort((a, b) => {
        if (a.highPrice > b.highPrice) {
          return 1;
        }

        if (a.highPrice < b.highPrice) {
          return -1;
        }

        return 0;
      });
    }

    // when descending
    if (selectedValue === "descending") {
      data.sort((a, b) => {
        if (a.highPrice > b.highPrice) {
          return -1;
        }

        if (a.highPrice < b.highPrice) {
          return 1;
        }

        return 0;
      });
    }
    sortedData = data;
    drawTable(data);
  });

  return sortedData;
};

getPriceDataFromBinance(
  '["BTCUSDT","BNBUSDT","ETHUSDT","ADAUSDT","SOLBTC","DOGEUSDT","ETHBTC","SOLETH"]'
).then((symbolsData) => {
  // draw initial table
  drawTable(symbolsData);

  const sortedData = sorting(symbolsData);

  // draw table filtered by text
  filterAndDrawTableBySearchText(sortedData);

  // draw table filtered by radio
  filterAndDrawTableByRadio(sortedData);
});
