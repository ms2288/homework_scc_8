const onlyShot = document.getElementsByClassName("onlyShot");
const onlyCream = document.getElementsByClassName("onlyCream");
const shotCream1 = document.getElementsByClassName("shotCream_shot");
const shotCream2 = document.getElementsByClassName("shotCream_cream");
const shotCinnamon1 = document.getElementsByClassName("shotCinnamon_shot");
const shotCinnamon2 = document.getElementsByClassName("shotCinnamon_cinnamon");

const minusBtn = document.getElementById("minusBtn");
const pulsBtn = document.getElementById("plusBtn");
const quantity = document.getElementById("menuQuantity");

const price = document.getElementById("price");
const headerSum = document.getElementById("header_sum");
const footerSum = document.getElementById("footer_sum");

const nowPrice = parseInt(headerSum.innerText.split(",").join(""));
let shotPrice = 0;
let num;

function handleOnlyShot(event) {
  for (var Btn of onlyShot) {
    Btn.className = "onlyShot";
    sum = parseInt(footerSum.innerText.split(",").join(""));
    if (Btn == event.target) {
      Btn.classList.add("selected");
      num = parseInt(quantity.innerText);
      if (Btn == onlyShot[0]) {
        sum -= shotPrice * num;
        shotPrice = 500;
        footerSum.innerText = (sum + shotPrice * num)
          .toLocaleString("en")
          .split(".")[0];
      } else if (Btn == onlyShot[1]) {
        sum -= shotPrice * num;
        shotPrice = 1000;
        footerSum.innerText = (sum + shotPrice * num)
          .toLocaleString("en")
          .split(".")[0];
      } else {
        sum -= shotPrice * num;
        footerSum.innerText = sum.toLocaleString("en").split(".")[0];
        shotPrice = 0;
      }
    }
  }
}

function handleOnlyCream(event) {
  for (var Btn of onlyCream) {
    Btn.className = "onlyCream";
    if (Btn == event.target) {
      Btn.classList.add("selected");
    }
  }
}

function handleShotCream1(event) {
  for (var Btn of shotCream1) {
    Btn.className = "shotCream_shot";
    sum = parseInt(footerSum.innerText.split(",").join(""));
    if (Btn == event.target) {
      Btn.classList.add("selected");
      num = parseInt(quantity.innerText);
      if (Btn == shotCream1[0]) {
        sum -= shotPrice * num;
        shotPrice = 500;
        footerSum.innerText = (sum + shotPrice * num)
          .toLocaleString("en")
          .split(".")[0];
      } else if (Btn == shotCream1[1]) {
        sum -= shotPrice * num;
        shotPrice = 1000;
        footerSum.innerText = (sum + shotPrice * num)
          .toLocaleString("en")
          .split(".")[0];
      } else {
        sum -= shotPrice * num;
        footerSum.innerText = sum.toLocaleString("en").split(".")[0];
        shotPrice = 0;
      }
    }
  }
}

function handleShotCream2(event) {
  for (var Btn of shotCream2) {
    Btn.className = "shotCream_cream";
    if (Btn == event.target) {
      Btn.classList.add("selected");
    }
  }
}

function handleShotCinnamon1(event) {
  for (var Btn of shotCinnamon1) {
    Btn.className = "shotCinnamon_shot";
    sum = parseInt(footerSum.innerText.split(",").join(""));
    if (Btn == event.target) {
      Btn.classList.add("selected");
      num = parseInt(quantity.innerText);
      if (Btn == shotCinnamon1[0]) {
        sum -= shotPrice * num;
        shotPrice = 500;
        footerSum.innerText = (sum + shotPrice * num)
          .toLocaleString("en")
          .split(".")[0];
      } else if (Btn == shotCinnamon1[1]) {
        sum -= shotPrice * num;
        shotPrice = 1000;
        footerSum.innerText = (sum + shotPrice * num)
          .toLocaleString("en")
          .split(".")[0];
      } else {
        sum -= shotPrice * num;
        footerSum.innerText = sum.toLocaleString("en").split(".")[0];
        shotPrice = 0;
      }
    }
  }
}

function handleShotCinnamon2(event) {
  for (var Btn of shotCinnamon2) {
    Btn.className = "shotCinnamon_cinnamon";
    if (Btn == event.target) {
      Btn.classList.add("selected");
    }
  }
}

function handleMinusBtn() {
  if (quantity.innerText == 1) return;
  num = parseInt(quantity.innerText) - 1;
  quantity.innerText = num;
  newPrice = (nowPrice * num).toLocaleString("en").split(".")[0];
  newPriceWithCream = ((nowPrice + shotPrice) * num)
    .toLocaleString("en")
    .split(".")[0];
  // price.innerText = `단가 ${newPrice}`;
  headerSum.innerText = newPrice;
  footerSum.innerText = newPriceWithCream;
}

function handlePlusBtn() {
  num = parseInt(quantity.innerText) + 1;
  quantity.innerText = num;
  newPrice = (nowPrice * num).toLocaleString("en").split(".")[0];
  newPriceWithCream = ((nowPrice + shotPrice) * num)
    .toLocaleString("en")
    .split(".")[0];
  // price.innerText = `단가 ${newPrice}`;
  headerSum.innerText = newPrice;
  footerSum.innerText = newPriceWithCream;
}

function main() {
  if (onlyShot) {
    for (var Btn of onlyShot) {
      Btn.addEventListener("click", handleOnlyShot);
    }
  }

  if (onlyCream) {
    for (var Btn of onlyCream) {
      Btn.addEventListener("click", handleOnlyCream);
    }
  }

  if (shotCream1) {
    for (var Btn of shotCream1) {
      Btn.addEventListener("click", handleShotCream1);
    }
  }

  if (shotCream2) {
    for (var Btn of shotCream2) {
      Btn.addEventListener("click", handleShotCream2);
    }
  }

  if (shotCinnamon1) {
    for (var Btn of shotCinnamon1) {
      Btn.addEventListener("click", handleShotCinnamon1);
    }
  }

  if (shotCinnamon2) {
    for (var Btn of shotCinnamon2) {
      Btn.addEventListener("click", handleShotCinnamon2);
    }
  }

  pulsBtn.addEventListener("click", handlePlusBtn);
  minusBtn.addEventListener("click", handleMinusBtn);
}
main();