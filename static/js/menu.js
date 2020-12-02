const body = document.body;
const navItemFirst = document.getElementById("navItemFirst");
const navItemSecond = document.getElementById("navItemSecond");
const navItemThird = document.getElementById("navItemThird");
const navItemFourth = document.getElementById("navItemFourth");
const navItemLeftBtn = document.getElementById("navItemLeftButton");
const navItemRightBtn = document.getElementById("navItemRightButton");
const nextBtnLeft = document.getElementById("nextButtonLeft");
const nextBtnRight = document.getElementById("nextButtonRight");
const nextBtnDisplay = document.getElementById("nextButtonDisplay");
const menuPage = document.querySelectorAll(".items div:nth-child(n)");
const banner = document.getElementById("banner");
const bannerImage = document.getElementById("bannerImage");
const item = document.getElementById("item");
const orderNameDiv = document.getElementById("orderNameDiv");
const orderPriceDiv = document.getElementById("orderPriceDiv");
const chevronLeft = document.getElementById("chevronLeft");
const chevronRight = document.getElementById("chevronRight");
const drinkNum = document.getElementById("drinkNum");
const totalPrice = document.getElementById("totalPrice");
const cancelAll = document.getElementById("cancelAll");
const cancelBtn = document.getElementById("cancelBtn");
const noBtn = document.getElementById("noBtn");

const minusBtn = document.getElementById("minusBtn");
const pulsBtn = document.getElementById("plusBtn");
const menuQuantity = document.getElementById("menuQuantity");

const price = document.getElementById("price");
const headerSum = document.getElementById("header_sum");
const footerSum = document.getElementById("footer_sum");
const eachPrice = document.getElementById("eachPrice");

const menuDiv = document.getElementById("menuDiv");
const orderDiv = document.getElementById("orderDiv");
const tableDiv = document.getElementById("tableDiv");

const selected = document.getElementsByClassName("selected");
const decideOrder = document.getElementById("decideOrder");
const decideCancel = document.getElementById("decideCancel");

const payByCard = document.getElementById("card");

const HOW_MANY_TO_SHOW = 12;

let number = 1;
let index = 0;
let len = menuPage.length;
let displayNumber = parseInt((len - 1) / 12);
let shotPrice = 0;
let num;

function minusNum() {
	if (number == 1) {
		return;
	}
	number -= 1;
	if (number == 1) {
		navItemFirst.innerHTML = `<a href="#" onclick="showCategory('COFFEE(HOT)')">Coffee(HOT)</a>`;
		navItemSecond.innerHTML = `<a href="#" onclick="showCategory('COFFEE(ICE)')">Coffee(ICE)</a>`;
		navItemThird.innerHTML = `<a href="#" onclick="showCategory('BEVERAGE')">BEVERAGE</a>`;
		navItemFourth.innerHTML = `<a href="#" onclick="showCategory('TEA')">TEA</a>`;
	}
	showCategory("COFFEE(HOT)");
	showMenuPage(0);
	setDisplay(displayNumber);
}
function plusNum() {
	if (number == 2) {
		return;
	}
	number += 1;

	if (number == 2) {
		navItemFirst.innerHTML = `<a href="#" onclick="showCategory('JUICE')">JUICE</a>`;
		navItemSecond.innerHTML = `<a href="#" onclick="showCategory('ADE')">ADE</a>`;
		navItemThird.innerHTML = `<a href="#" onclick="showCategory('SMOOTHIE')">SMOOTHIE&FRAFFE</a>`;
		navItemFourth.innerHTML = `<a href="#" onclick="showCategory('DESSERT')">DESSERT</a>`;
	}
	showCategory("JUICE");
}

function showCategory(cat) {
	//선택시 menuPage에 있는 메뉴들이 해당 카테고리의 것으로 바뀐다. 그 다음 displayNumber가 처음(0)으로 돌아가도록 하고
	//첫번째 페이의 음료 목록을 보여주고, 디스플레이(●○○)를 처음으로 한다
	let count_of_item_in_category = 0;
	for (var i = 0; i < len; i++) {
		menuPage[i].style.display = "none";
		menuPage[i].setAttribute("data-selected", "");
		if (String(menuPage[i].children[3].innerText).includes(cat)) {
			//이 부분 children[3]에서 3이란게 카테고리를 가리키는거예요. 원래 저렇게 쓰면 안좋은데 딱히 방법이 생각 안 나서
			menuPage[i].setAttribute("data-selected", "selected");
			count_of_item_in_category++;
		}
	}

	displayNumber = parseInt((count_of_item_in_category - 1) / HOW_MANY_TO_SHOW);
	minusIndex();
	minusIndex();
	showMenuPage(index);
	setDisplay(displayNumber);
}

function showMenuPage(num) {
	//num번째의 페이지에 있는 메뉴 목록을 HOW_MANY_TO_SHOW개씩 보여준다
	let count = 0;
	for (var i = 0; i < len; i++) {
		if (menuPage[i].getAttribute("data-selected")) {
			if (
				num * HOW_MANY_TO_SHOW <= count &&
				count < (num + 1) * HOW_MANY_TO_SHOW
			) {
				menuPage[i].style.display = "grid";
			} else {
				menuPage[i].style.display = "none";
			}
			count++;
		}
	}
}

function minusIndex() {
	if (index == 0) {
		return;
	}
	index -= 1;
	if (displayNumber == 1) {
		if (index == 0) {
			showMenuPage(0);
			nextBtnDisplay.innerText = "• ∘";
		}
	}
	if (displayNumber == 2) {
		if (index == 0) {
			showMenuPage(0);
			nextBtnDisplay.innerText = "• ∘ ∘";
		}

		if (index == 1) {
			showMenuPage(1);
			nextBtnDisplay.innerText = "∘ • ∘";
		}
	}
}
function plusIndex() {
	if (index == 2) {
		return;
	}
	index += 1;
	if (displayNumber == 1) {
		if (index == 1) {
			showMenuPage(1);
			nextBtnDisplay.innerText = "∘ •";
		}
	}
	if (displayNumber == 2) {
		if (index == 1) {
			showMenuPage(1);
			nextBtnDisplay.innerText = "∘ • ∘";
		}
		if (index == 2) {
			showMenuPage(2);
			nextBtnDisplay.innerText = "∘ ∘ •";
		}
	}
}

function setDisplay(number) {
	if (number == 0) {
		nextBtnDisplay.innerText = "•";
		nextBtnLeft.removeEventListener;
		nextBtnRight.removeEventListener;
	}
	if (number == 1) {
		nextBtnDisplay.innerText = "• ∘";
	}
	if (number == 2) {
		nextBtnDisplay.innerText = "• ∘ ∘";
	}
}

function showCart() {
	const cartItems1 = document.querySelectorAll(
		"#orderNameDiv span:nth-child(n)"
	);
	const cartItems2 = document.querySelectorAll(
		"#orderPriceDiv span:nth-child(n)"
	);

	lastPage = parseInt(parseInt((cartItems1.length - 1) / 3) / 4);
	for (var i = 0; i < cartItems1.length; i++) {
		if (parseInt(parseInt(i / 3) / 4) != lastPage) {
			cartItems1[i].style.display = "none";
		} else {
			cartItems1[i].style.display = "";
		}
	}
	for (var i = 0; i < cartItems2.length; i++) {
		if (parseInt(parseInt(i / 2) / 4) != lastPage) {
			cartItems2[i].style.display = "none";
		} else {
			cartItems2[i].style.display = "";
		}
	}
}

function minusCart() {
	const cartItems1 = document.querySelectorAll(
		"#orderNameDiv span:nth-child(n)"
	);
	const cartItems2 = document.querySelectorAll(
		"#orderPriceDiv span:nth-child(n)"
	);
	let number;
	for (var i = 0; i < cartItems1.length; i++) {
		if (cartItems1[i].style.display != "none") {
			number = parseInt(parseInt(i / 3) / 4);
			break;
		}
	}
	if (number == 0) return;
	number -= 1;
	for (var i = 0; i < cartItems1.length; i++) {
		if (parseInt(parseInt(i / 3) / 4) != number) {
			cartItems1[i].style.display = "none";
		} else {
			cartItems1[i].style.display = "";
		}
	}
	for (var i = 0; i < cartItems2.length; i++) {
		if (parseInt(parseInt(i / 2) / 4) != number) {
			cartItems2[i].style.display = "none";
		} else {
			cartItems2[i].style.display = "";
		}
	}
}
function plusCart() {
	const cartItems1 = document.querySelectorAll(
		"#orderNameDiv span:nth-child(n)"
	);
	const cartItems2 = document.querySelectorAll(
		"#orderPriceDiv span:nth-child(n)"
	);

	lastPage = parseInt(parseInt((cartItems1.length - 1) / 3) / 4);
	let number;
	for (var i = 0; i < cartItems1.length; i++) {
		if (cartItems1[i].style.display != "none") {
			number = parseInt(parseInt(i / 3) / 4);
			break;
		}
	}
	if (number == lastPage) return;
	number += 1;
	for (var i = 0; i < cartItems1.length; i++) {
		if (parseInt(parseInt(i / 3) / 4) != number) {
			cartItems1[i].style.display = "none";
		} else {
			cartItems1[i].style.display = "";
		}
	}
	for (var i = 0; i < cartItems2.length; i++) {
		if (parseInt(parseInt(i / 2) / 4) != number) {
			cartItems2[i].style.display = "none";
		} else {
			cartItems2[i].style.display = "";
		}
	}
}

function changeDrinkNum() {
	const quantity = document.querySelectorAll("#cartQuantity");
	sum = 0;
	for (var i = 0; i < quantity.length; i++) {
		sum += parseInt(quantity[i].innerText);
	}
	drinkNum.innerHTML = sum;
}
function changeTotalPrice() {
	const quantity = document.querySelectorAll("#cartQuantity");
	const cartItems2 = document.querySelectorAll("#orderPrice");
	sum = 0;
	for (var i = 0; i < cartItems2.length; i++) {
		sum +=
			parseInt(cartItems2[i].innerText.split(",").join("")) *
			quantity[i].innerText;
	}
	totalPrice.innerText = sum.toLocaleString("en").split(".")[0];
}

function delBtnRemover(event) {
	const cartItems1 = document.querySelectorAll(
		"#orderNameDiv span:nth-child(n)"
	);
	const cartItems2 = document.querySelectorAll(
		"#orderPriceDiv span:nth-child(n)"
	);
	let nameIndex;
	let priceIndex;

	for (var i = 0; i < cartItems2.length; i++) {
		if (cartItems2[i] == event.target) {
			nameIndex = ((i + 1) / 2) * 3 - 1;
			priceIndex = i;
			break;
		}
	}

	orderNameDiv.removeChild(cartItems1[nameIndex - 2]);
	orderPriceDiv.removeChild(cartItems2[priceIndex]);
	orderPriceDiv.removeChild(cartItems2[priceIndex - 1]);

	if ((cartItems1.length - 3) % 12 == 0) {
		if (cartItems1.length == 3) {
			chevronLeft.style.visibility = "hidden";
			chevronRight.style.visibility = "hidden";
			bannerImage.style.opacity = 1;
		} else {
			showCart();
		}
	}
	changeDrinkNum();
	changeTotalPrice();
}

function delBtnListener() {
	const delBtn = document.querySelectorAll("#deleteBtn");
	for (var Btn of delBtn) {
		Btn.addEventListener("click", delBtnRemover);
	}
}

function handleMinusIcon(event) {
	const fas = document.getElementsByClassName("fa-minus-circle");
	let node;
	for (var Btn of fas) {
		if (Btn == event.target) {
			node = Btn.previousSibling;
		}
	}
	currentNum = parseInt(node.innerText);
	if (currentNum == 1) return;
	else {
		currentNum -= 1;
		node.innerText = `\n\n ${currentNum}`;
		changeDrinkNum();
		changeTotalPrice();
	}
}
function handlePlusIcon(event) {
	const fas = document.getElementsByClassName("fa-plus-circle");
	let node;
	for (var Btn of fas) {
		if (Btn == event.target) {
			node = Btn.previousSibling.previousSibling;
		}
	}
	currentNum = parseInt(node.innerText);
	currentNum += 1;
	node.innerText = `\n\n ${currentNum}`;
	changeDrinkNum();
	changeTotalPrice();
}

function addMenu(src, name, price, itemNumber, itemOption1, itemOption2) {
	const spanForName = document.createElement("span");
	spanForName.id = "orderName";
	spanForName.innerText = name;
	orderNameDiv.appendChild(spanForName);
	const spanForPrice = document.createElement("span");
	spanForPrice.id = "orderPrice";
	spanForPrice.innerText = price;
	orderPriceDiv.appendChild(spanForPrice);
	const drinkImg = document.createElement("img");
	drinkImg.id = "orderDrink";
	drinkImg.src = src;
	spanForPrice.appendChild(drinkImg);

	// delete
	const deleteBtn = document.createElement("span");
	deleteBtn.id = "deleteBtn";
	deleteBtn.innerText = "X";
	orderPriceDiv.appendChild(deleteBtn);
	delBtnListener();

	// quantity
	const cartQuantity = document.createElement("span");
	cartQuantity.id = "cartQuantity";

	if (itemNumber) {
		cartQuantity.innerText = `\n\n ${itemNumber}`;
	} else {
		cartQuantity.innerText = "\n\n 1";
	}
	spanForName.appendChild(cartQuantity);

	bannerImage.style.opacity = 0;

	// + -
	const minusIcon = document.createElement("i");
	spanForName.appendChild(minusIcon);
	minusIcon.className = "fas fa-minus-circle";
	const plusIcon = document.createElement("i");
	spanForName.appendChild(plusIcon);
	plusIcon.className = "fas fa-plus-circle";

	minusIcon.addEventListener("click", handleMinusIcon);
	plusIcon.addEventListener("click", handlePlusIcon);

	// option
	const option = document.createElement("span");
	option.id = "option";
	spanForName.appendChild(option);
	if (itemOption1 == 0) {
		option.innerText = "+샷추가 1개";
	} else if (itemOption1 == 1) {
		option.innerText = "+샷추가 2개";
	} else if (itemOption1 == 2) {
		option.innerText = "+연하게";
	} else if (itemOption1 == 3) {
		option.innerText = "휘핑O";
	} else if (itemOption1 == 4) {
		option.innerText = "휘핑X";
	} else if (itemOption1 == 5 && itemOption2 == 0) {
		option.innerText = "+샷추가 1개 휘핑O";
	} else if (itemOption1 == 5 && itemOption2 == 1) {
		option.innerText = "+샷추가 1개 휘핑X";
	} else if (itemOption1 == 6 && itemOption2 == 0) {
		option.innerText = "+샷추가 2개 휘핑O";
	} else if (itemOption1 == 6 && itemOption2 == 1) {
		option.innerText = "+샷추가 2개 휘핑X";
	} else if (itemOption1 == 7 && itemOption2 == 0) {
		option.innerText = "휘핑O";
	} else if (itemOption1 == 7 && itemOption2 == 1) {
		option.innerText = "+휘핑X";
	} else if (itemOption1 == 8 && itemOption2 == 2) {
		option.innerText = "+샷추가 1개 시나몬O";
	} else if (itemOption1 == 8 && itemOption2 == 3) {
		option.innerText = "+샷추가 1개 시나몬X";
	} else if (itemOption1 == 9 && itemOption2 == 2) {
		option.innerText = "+샷추가 2개 시나몬O";
	} else if (itemOption1 == 9 && itemOption2 == 3) {
		option.innerText = "+샷추가 2개 시나몬X";
	} else if (itemOption1 == 10 && itemOption2 == 2) {
		option.innerText = "시나몬O";
	} else if (itemOption1 == 10 && itemOption2 == 3) {
		option.innerText = "시나몬X";
	}

	// banner
	banner.style.backgroundColor = "lightgray";
	chevronLeft.style.visibility = "visible";
	chevronRight.style.visibility = "visible";

	// cart 4개씩
	showCart();

	// change footer number
	changeDrinkNum();
	changeTotalPrice();
}

function handleDecideCancel() {
	menuDiv.style.visibility = "visible";
	orderDiv.style.visibility = "hidden";
}
// 커피 추가, 옵션 넣기
function handleDecideOrder() {
	const drinkImg = document.getElementsByClassName("drinkImg");
	const menuName = document.getElementById("menuName");
	src = drinkImg[0].src;
	name = menuName.innerText;
	itemPrice = parseInt(footerSum.innerText.split(",").join(""));
	itemQuantity = parseInt(menuQuantity.innerText);
	itemPrice = itemPrice / itemQuantity;
	let itemOption1;
	let itemOption2;
	const onlyShot = document.getElementsByClassName("onlyShot");
	const onlyCream = document.getElementsByClassName("onlyCream");
	const shotCream1 = document.getElementsByClassName("shotCream_shot");
	const shotCream2 = document.getElementsByClassName("shotCream_cream");
	const shotCinnamon1 = document.getElementsByClassName("shotCinnamon_shot");
	const shotCinnamon2 = document.getElementsByClassName(
		"shotCinnamon_cinnamon"
	);

	if (onlyShot) {
		for (var i = 0; i < 3; i++) {
			if (onlyShot[i] == selected[0]) {
				itemOption1 = i;
				break;
			}
		}
	}

	if (onlyCream) {
		for (var i = 0; i < 2; i++) {
			if (onlyCream[i] == selected[0]) {
				itemOption1 = i + 3;
				break;
			}
		}
	}

	if (shotCream1) {
		for (var i = 0; i < 3; i++) {
			if (shotCream1[i] == selected[0]) {
				itemOption1 = i + 5;
				// break;
			}
		}
		for (var i = 0; i < 2; i++) {
			if (shotCream2[i] == selected[1]) {
				itemOption2 = i;
				break;
			}
		}
	}

	if (shotCinnamon1) {
		for (var i = 0; i < 3; i++) {
			if (shotCinnamon1[i] == selected[0]) {
				itemOption1 = i + 8;
				break;
			}
		}
		for (var i = 0; i < 2; i++) {
			if (shotCinnamon2[i] == selected[1]) {
				itemOption2 = i + 2;
				break;
			}
		}
	}

	menuDiv.style.visibility = "visible";
	orderDiv.style.visibility = "hidden";
	addMenu(src, name, itemPrice, itemQuantity, itemOption1, itemOption2);
}

function setting(src, name, itemPrice) {
	const drinkImg = document.getElementsByClassName("drinkImg");
	const menuName = document.getElementById("menuName");
	drinkImg[0].src = src;
	menuName.innerText = name;
	eachPrice.innerText = `단가 ${itemPrice}`;
	footerSum.innerText = itemPrice;
	headerSum.innerText = itemPrice;
	// 갯수 초기화
	menuQuantity.innerText = "1";
	decideCancel.addEventListener("click", handleDecideCancel);
	decideOrder.addEventListener("click", handleDecideOrder);
	chevronLeft.style.visibility = "hidden";
	chevronRight.style.visibility = "hidden";
	shotPrice = 0;
}

function goToOnlyShot() {
	menuDiv.style.visibility = "hidden";
	orderDiv.style.visibility = "visible";
	tableDiv.innerHTML =
		'<table id="onlyShot"><tbody><tr><td class="onlyShot_topping">샷추가</td><td class="onlyShot">샷추가1개<br>(+ 500)</td><td class="onlyShot">샷추가2개<br>(+ 1,000)</td><td class="onlyShot">연하게</td><td class="onlyShot selected">선택안함</td></tr></tbody></table>';
	const onlyShot = document.getElementsByClassName("onlyShot");
	for (var Btn of onlyShot) {
		Btn.addEventListener("click", handleOnlyShot);
	}
}

function goToOnlyCream() {
	menuDiv.style.visibility = "hidden";
	orderDiv.style.visibility = "visible";
	tableDiv.innerHTML =
		'<table id="onlyCream"><tbody><tr><td class="onlyCream_topping">휘핑</td><td class="onlyCream">휘핑O</td><td class="onlyCream selected">휘핑X</td></tr></tbody></table>';
	const onlyCream = document.getElementsByClassName("onlyCream");
	for (var Btn of onlyCream) {
		Btn.addEventListener("click", handleOnlyCream);
	}
}
function goToShotCream() {
	menuDiv.style.visibility = "hidden";
	orderDiv.style.visibility = "visible";
	tableDiv.innerHTML =
		'<table id="shotCream"><tbody><tr class="first"><td class="shotCream_shot_topping">토핑</td><td class="shotCream_shot">샷추가1개<br>(+ 500)</td><td class="shotCream_shot">샷추가2개<br>(+ 1,000)</td><td class="shotCream_shot selected">선택안함</td></tr><tr><td class="shotCream_cream_topping">토핑2</td><td class="shotCream_cream">휘핑O</td><td class="shotCream_cream selected">휘핑X</td></tr></tbody></table>';
	const shotCream1 = document.getElementsByClassName("shotCream_shot");
	const shotCream2 = document.getElementsByClassName("shotCream_cream");
	for (var Btn of shotCream1) {
		Btn.addEventListener("click", handleShotCream1);
	}
	for (var Btn of shotCream2) {
		Btn.addEventListener("click", handleShotCream2);
	}
}
function goToShotCinnamon() {
	menuDiv.style.visibility = "hidden";
	orderDiv.style.visibility = "visible";
	tableDiv.innerHTML =
		'<table id="shotCinnamon"><tbody><tr class="first"><td class="shotCinnamon_shot_topping">토핑</td><td class="shotCinnamon_shot">샷추가1개<br>(+ 500)</td><td class="shotCinnamon_shot">샷추가2개<br>(+ 1,000)</td><td class="shotCinnamon_shot selected">선택안함</td></tr><tr><td class="shotCinnamon_cinnamon_topping">토핑2</td><td class="shotCinnamon_cinnamon">시나몬O</td><td class="shotCinnamon_cinnamon selected">시나몬X</td></tr></tbody></table>';
	const shotCinnamon1 = document.getElementsByClassName("shotCinnamon_shot");
	const shotCinnamon2 = document.getElementsByClassName(
		"shotCinnamon_cinnamon"
	);
	for (var Btn of shotCinnamon1) {
		Btn.addEventListener("click", handleShotCinnamon1);
	}
	for (var Btn of shotCinnamon2) {
		Btn.addEventListener("click", handleShotCinnamon2);
	}
}

function trackItem() {
	html = this.innerHTML;
	src = html.split('"')[3];
	name = html.split(">")[2];
	name = name.split("<")[0];
	itemPrice = html.split(">")[4];
	itemPrice = itemPrice.split("<")[0];
	prop = html.split(">")[8];
	prop = prop.split("<")[0];
	if (prop == "true,false,false") {
		goToOnlyShot();
		setting(src, name, itemPrice);
		return;
	} else if (prop == "false,true,false") {
		goToOnlyCream();
		setting(src, name, itemPrice);
		return;
	} else if (prop == "true,true,false") {
		goToShotCream();
		setting(src, name, itemPrice);
		return;
	} else if (prop == "true,false,true") {
		goToShotCinnamon();
		setting(src, name, itemPrice);
		return;
	}
	addMenu(src, name, itemPrice);
}

function handleOnlyShot(event) {
	const onlyShot = document.getElementsByClassName("onlyShot");
	for (var Btn of onlyShot) {
		Btn.className = "onlyShot";
		sum = parseInt(footerSum.innerText.split(",").join(""));
		if (Btn == event.target) {
			Btn.classList.add("selected");
			num = parseInt(menuQuantity.innerText);
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
	const onlyCream = document.getElementsByClassName("onlyCream");

	for (var Btn of onlyCream) {
		Btn.className = "onlyCream";
		if (Btn == event.target) {
			Btn.classList.add("selected");
		}
	}
}

function handleShotCream1(event) {
	const shotCream1 = document.getElementsByClassName("shotCream_shot");

	for (var Btn of shotCream1) {
		Btn.className = "shotCream_shot";
		sum = parseInt(footerSum.innerText.split(",").join(""));
		if (Btn == event.target) {
			Btn.classList.add("selected");
			num = parseInt(menuQuantity.innerText);
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
	const shotCream2 = document.getElementsByClassName("shotCream_cream");
	for (var Btn of shotCream2) {
		Btn.className = "shotCream_cream";
		if (Btn == event.target) {
			Btn.classList.add("selected");
		}
	}
}

function handleShotCinnamon1(event) {
	const shotCinnamon1 = document.getElementsByClassName("shotCinnamon_shot");
	for (var Btn of shotCinnamon1) {
		Btn.className = "shotCinnamon_shot";
		sum = parseInt(footerSum.innerText.split(",").join(""));
		if (Btn == event.target) {
			Btn.classList.add("selected");
			num = parseInt(menuQuantity.innerText);
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
	const shotCinnamon2 = document.getElementsByClassName(
		"shotCinnamon_cinnamon"
	);
	for (var Btn of shotCinnamon2) {
		Btn.className = "shotCinnamon_cinnamon";
		if (Btn == event.target) {
			Btn.classList.add("selected");
		}
	}
}

function handleMinusBtn() {
	if (menuQuantity.innerText == 1) return;
	num = parseInt(menuQuantity.innerText) - 1;
	menuQuantity.innerText = num;
	nowPrice = eachPrice.split("")[1].split(",").join("");
	newPrice = (nowPrice * num).toLocaleString("en").split(".")[0];
	newPriceWithCream = ((nowPrice + shotPrice) * num)
		.toLocaleString("en")
		.split(".")[0];
	// price.innerText = `단가 ${newPrice}`;
	headerSum.innerText = newPrice;
	footerSum.innerText = newPriceWithCream;
}

function handlePlusBtn() {
	num = parseInt(menuQuantity.innerText) + 1;
	menuQuantity.innerText = num;
	nowPrice = parseInt(eachPrice.innerHTML.split(" ")[1].split(",").join(""));
	newPrice = (nowPrice * num).toLocaleString("en").split(".")[0];
	newPriceWithCream = ((nowPrice + shotPrice) * num)
		.toLocaleString("en")
		.split(".")[0];
	// price.innerText = `단가 ${newPrice}`;
	headerSum.innerText = newPrice;
	footerSum.innerText = newPriceWithCream;
}

function handleCancelAll() {
	cancelBtn.style.visibility = "visible";
	cancelBtn.style.position = "relative";
	cancelBtn.style.top = "-400px";
}

function handleNoBtn() {
	cancelBtn.style.visibility = "hidden";
}

function main() {
	showCategory("COFFEE(HOT)");
	showMenuPage(0);
	setDisplay(displayNumber);

	navItemLeftBtn.addEventListener("click", minusNum);
	navItemRightBtn.addEventListener("click", plusNum);
	showCategory("COFFEE(HOT)");
	showMenuPage(0);
	setDisplay(displayNumber);
	navItemLeftBtn.addEventListener("click", minusNum);
	navItemRightBtn.addEventListener("click", plusNum);
	nextBtnLeft.addEventListener("click", minusIndex);
	nextBtnRight.addEventListener("click", plusIndex);

	for (var i = 0; i < len; i++) {
		menuPage[i].addEventListener("click", trackItem);
	}

	chevronLeft.addEventListener("click", minusCart);
	chevronRight.addEventListener("click", plusCart);

	pulsBtn.addEventListener("click", handlePlusBtn);
	minusBtn.addEventListener("click", handleMinusBtn);

	cancelAll.addEventListener("click", handleCancelAll);
	noBtn.addEventListener("click", handleNoBtn);

	//JH   결제 요청 시 서버에 주문 내역이 JSON으로 전달되도록
	payByCard.addEventListener("click", () => {
		//카트 안의 아이템들을 순회하면서 정보를 수집하고 주문목록에 등록한다.
		const shoppingCart = new ShoppingCart(0204, 101);

		const itemLength = document.querySelectorAll("#cartQuantity").length;
		for (let i = 0; i < itemLength; i++) {
			//수량, 가격, 이름 가져오기
			const itemQuantity = parseInt(document.querySelectorAll("#cartQuantity")[i].innerText);
			const itemPrice = parseInt(document.querySelectorAll("#orderPrice")[i].innerText.split(",").join(""));
			let itemName = document.querySelectorAll("#orderName")[i].innerText
			itemName = itemName.slice(0, itemName.indexOf("\n"))

			//옵션 설정
			const itemOptionText = orderNameDiv.children[i].innerText
			const itemShot = 0;//샷 기본
			const shotIndex = itemOptionText.indexOf("샷추가");
			if (-1 < shotIndex)// 샷이 +1~2
				shot = parseInt(itemOptionText[shotIndex + 4]);
			else if (-1 < itemOptionText.indexOf("연하게")) //샷 연하게
				shot = -1;

			const itemCream = (itemOptionText.indexOf("휘핑O") != -1)
			const itemCinnamon = (itemOptionText.indexOf("시나몬O") != -1)

			//정보 담기
			shoppingCart.insertOrder(new Menu("", itemName, itemPrice, itemQuantity, "", itemShot, itemCream, itemCinnamon).getValue())
		}

		let orderInfo = shoppingCart.constructOrderList()

		let form = document.createElement("form");
		form.style.visibility = "hidden"; // no user interaction is necessary
		form.method = "POST"; // forms by default use GET query strings
		form.action = "/check";
		for (key of Object.keys(orderInfo)) {
			var input = document.createElement("input");
			input.name = key;
			input.value = orderInfo[key];
			form.appendChild(input); // add key/value pair to form
		}
		document.body.appendChild(form); // forms cannot be submitted outside of body
		form.submit(); // send the payload and navigate
	});
	//JH******************************************
}

main();