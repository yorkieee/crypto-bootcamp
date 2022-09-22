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
  document.querySelector(".table").appendChild(tbody);

  data.forEach((symbolData) => {
    const tr = document.createElement("tr");
    // tr.className = "table-primary";

    const td1 = document.createElement("td");
    td1.innerHTML = symbolData.symbol;

    const td2 = document.createElement("td");
    td2.innerHTML = symbolData.lastPrice;

    const td3 = document.createElement("td");
    td3.innerHTML = symbolData.lowPrice;

    const td4 = document.createElement("td");
    td4.innerHTML = symbolData.highPrice;

    const td5 = document.createElement("td");
    td5.innerHTML = symbolData.priceChange;

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

const filterAndDrawTableBySearchText = () => {
  document.querySelector("#search-text").addEventListener("input", (e) => {
    const userInput = e.target.value;

    if (userInput === "") {
      drawTable(originalData);
      return;
    }

    // filtering here
    const filteredSymbolsData = originalData.filter((symbolData) =>
      symbolData.symbol.toLowerCase().includes(userInput.toLowerCase())
    );

    drawTable(filteredSymbolsData);
  });
};

const filterAndDrawTableByRadio = () => {
  document.querySelector(".radio-filter").addEventListener("change", (e) => {
    const selectedValue = e.target.labels[0].innerText;

    if (selectedValue.toLowerCase() === "all") {
      drawTable(originalData);
      return;
    }

    // filtering here
    const filteredSymbolsData = originalData.filter((symbolData) =>
      symbolData.symbol.toLowerCase().includes(selectedValue.toLowerCase())
    );

    filteredData = filteredSymbolsData;
    drawTable(filteredSymbolsData);
  });
};

const sorting = () => {
  document.querySelector("#select").addEventListener("change", (e) => {
    const selectedValue = e.target.value;

    // when ascending
    if (selectedValue === "ascending") {
      filteredData.sort((a, b) => {
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
      filteredData.sort((a, b) => {
        if (a.highPrice > b.highPrice) {
          return -1;
        }

        if (a.highPrice < b.highPrice) {
          return 1;
        }

        return 0;
      });
    }
    drawTable(filteredData);
  });
};

/// main program
let filteredData;
let originalData;

getPriceDataFromBinance(
  '["BTCUSDT","BNBUSDT","ETHUSDT","ADAUSDT","SOLBTC","DOGEUSDT","ETHBTC","SOLETH"]'
).then((binanceData) => {
  filteredData = binanceData;
  originalData = binanceData;

  drawTable(originalData);

  sorting();

  filterAndDrawTableBySearchText();

  filterAndDrawTableByRadio();
});
