const shot1 = document.getElementById("shot1");
const shot2 = document.getElementById("shot2");
const milder = document.getElementById("milder");
const none = document.getElementById("none");

function changeBorder() {
    this.style.borderColor = "red";
    this.style.borderWidth = "3px";
    this.style.backgroundColor = "rgb(240, 234, 234)";
  }


function main() {
    shot1.addEventListener("click", changeBorder);
    shot2.addEventListener("click", changeBorder);
    milder.addEventListener("click", changeBorder);
    none.addEventListener("click", changeBorder);
}

main();