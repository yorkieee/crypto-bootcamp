var data = exchange.symbols;
console.log("data", data);

var tbody = document.getElementById("tbody");

for (var i = 0; i < data.length; i++) {
  var tr = document.createElement("tr");

  var td1 = document.createElement("td");
  td1.innerHTML = data[i].baseAsset;

  var td2 = document.createElement("td");
  td1.innerHTML = data[i].quoteAsset;

  var td3 = document.createElement("td");
  td2.innerHTML = data[i].filters[0].minPrice;

  var td4 = document.createElement("td");
  td3.innerHTML = data[i].filters[0].maxPrice;

  //   var td5 = document.createElement("td");
  //   td3.innerHTML = data[i].priceChangePercent;

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  //   tr.appendChild(td4);

  tbody.appendChild(tr);
}

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
