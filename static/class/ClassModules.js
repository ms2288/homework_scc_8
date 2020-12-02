/* JH 
 * 클라이언트 측에서 require를 사용해서 클래스를 불러올 수 없어서 임시로 클래스들을 복사해서 붙여넣었습니다
 * 일단 이 js파일을 html(pug)에 포함시켜서 클래스를 사용하고 나중에 모듈화할게요
 * */

class Menu {
	constructor(cat = "", name = "", price = 0, quantity = 0, image = "/static/picture/default.png", shot = 0, cream = false, cinnamon = false) {
		this.cat = cat
		this.name = name
		this.price = price
		this.quantity = quantity
		this.image = image
		this.shot = shot
		this.cream = cream
		this.cinnamon = cinnamon
	}

	getValue() {
		return {
			'cat': this.cat
			, 'name': this.name
			, 'price': this.price
			, 'quantity': this.quantity
			, 'image': this.image
			, 'shot': this.shot
			, 'cream': this.cream
			, 'cinnamon': this.cinnamon
		}
	}
}

class ShoppingCart {
	//쇼핑카트에 사용되는 클래스이다. 선택된 메뉴를 저장하여 주문 정보를 객체로 만들어 반환한다. 
	//이 자체가 DB에 저장되지는 않고 이 클래스가 생산하는 주문 정보 객체가 DB에 저장된다. 

	constructor(storeNum, orderNum) {
		this.storeNum = storeNum
		this.orderNum = orderNum

		this.menus = []
		this.price = 0
		this.quantity = 0
	}

	//쇼핑카트 초기화
	initiate() {
		this.menus = []
		this.price = 0
		this.quantity = 0
	}

	//메뉴 추가/삭제
	insertOrder(menu) {
		this.menus.push(menu)
		this.quantity += parseInt(menu['quantity'])
		this.price += (parseInt(menu['price']) * parseInt(menu['quantity']))
	}
	deleteOrder(idx) {
		const target = this.menus[idx].getValue()
		this.menus.splice(idx, 1)
		this.price -= parseInt(target['price'])
		this.quantity -= parseInt(target['quantity'])
	}

	//주문내역 생성 후 쇼핑카트 초기화
	constructOrderList() {
		//주문번호를 페이지가 바뀌어도 같게 되도록 해야 하는데 그 부분에서 문제가 있습니다. 고치는데 조금 복잡할 것 같아서 차후에 수정하도록 할게요
		const ret = new OrderList(this.storeNum, this.orderNum, this.menus, this.price, this.quantity)

		this.orderNum++
		if (this.orderNum / 100 == 0) orderNum -= 100 //ex) 600번부터 699번까지 순환 후 700번을 부를 차례가 되면 100을 빼서 600번으로 돌아가도록
		this.initiate()

		return ret.getValue()
	}
}

class OrderList {
	constructor(storeNum, orderNum, menus, price, quantity) {
		this.storeNum = storeNum
		this.orderNum = orderNum
		this.menus = menus
		this.price = price
		this.quantity = quantity

		this.orderTime = new Time()
		this.id = this.orderTime.getTimeString() + String(this.storeNum)//시간 14자리 + 매장번호 4자리
	}

	setIdArb(input_id) {
		//임의로(arbitrary) id를 부여한다.
		//id는 18자리 문자열이며 조건에 부합하지 않을 경우 000000000000000000으로 한다
		if (input_id.length != 18) {
			console.error("Invalid ID. returning default ID: 000000000000000000")
			this.id = "000000000000000000"
		}
		this.storeNum = parseInt(input_id.slice(14))
		this.orderTime = new Time(input_id.slice(0, 14))
	}
	getValue() {
		return {
			"id": this.id
			, "orderTime": JSON.stringify(this.orderTime)
			, "storeNum": this.storeNum
			, "orderNum": this.orderNum
			, "menus": JSON.stringify(this.menus)
			, "price": this.price
			, "quantity": this.quantity
		}
	}
}

class Stamp {
	constructor(id, ph, stampNum, date, exp_date) {
		this.id = id
		this.ph = ph
		this.stamp = stampNum
		this.date = date
		this.exp_date = exp_date
	}
	getValue() {
		return {
			"id": this.id
			, "ph": this.ph
			, "stamp": this.stampNum
			, "date": this.date
			, "exp_date": this.exp_date
		}
	}
}

class Store {
	constructor(id = 0, pw = 0, name = "", addr = "") {
		//점포 id는 db에서 마지막 점포의 id를 받아와 그것에 1을 더한 것을 새 id로 한다.
		this.id = id
		this.name = name
		this.addr = addr
	}

	getValue() {
		return {
			"id": this.id
			, "name": this.name
			, "addr": this.addr
		}
	}
}

class Time extends Date {
	/*일월연시분초를 가지는 시간 클래스 
	*
    * 14자리 문자열, 혹은 일,월,연,시,분,초를 매개변수로 넣어서 임의의 시간 생성
    * 
    * 혹은 아무것도 넣지 않아서 현재의 시간 생성
    * 
    * 생성된 객체를 14자리 string으로 반환할 수 있음
    */

	constructor(y, m, d, hr, min, sec) {
		if (typeof (y) === typeof ("")) {
			//첫번째 매개변수의 타입이 ""이랑 같은(string일) 경우 14자리를 일월연시분초로 parse하여 시간 생성
			let time = y.replace('T', '').replace(':', '').replace('-', '').replace(':', '').replace('-', '')//ISOtime도 변환 가능

			y = parseInt(time.slice(0, 4))
			m = parseInt(time.slice(4, 6)) - 1
			d = parseInt(time.slice(6, 8))
			hr = parseInt(time.slice(8, 10))
			min = parseInt(time.slice(10, 12))
			sec = parseInt(time.slice(12, 14))

			super(y, m, d, hr, min, sec)
		}
		else if (typeof (y) === typeof (1)) {
			//첫 번째 매개변수의 타입이 1이랑 같을 경우(숫자일 경우) 그대로 입력해서 시간 생성
			super(y, m - 1, d, hr, min, sec)
		}
		else {
			//매개변수가 없을 경우 현재 시간 생성
			super()
		}

		this.year = (y === undefined ? this.getFullYear() : y)
		this.month = (m === undefined ? this.getMonth() + 1 : m)
		this.date = (d === undefined ? this.getDate() : d)
		this.hour = (hr === undefined ? this.getHours() : hr)
		this.minute = (min === undefined ? this.getMinutes() : min)
		this.second = (sec === undefined ? this.getSeconds() : sec)

	}
	getTimeDBString() {
		//DB 입력용
		let time = "" + this.year
		if (this.month >= 10)
			time += "-" + this.month
		else
			time += "-0" + this.month
		if (this.date >= 10)
			time += "-" + this.date
		else
			time += "-0" + this.date
		if (this.hour >= 10)
			time += " " + this.hour
		else
			time += " 0" + this.hour
		if (this.minute >= 10)
			time += ":" + this.minute
		else
			time += ":0" + this.minute
		if (this.second >= 10)
			time += ":" + this.second
		else
			time += ":0" + this.second

		return time
	}
	getTimeString() {
		let time = "" + this.year
		if (this.month >= 10)
			time += "" + this.month
		else
			time += "0" + this.month
		if (this.date >= 10)
			time += "" + this.date
		else
			time += "0" + this.date
		if (this.hour >= 10)
			time += "" + this.hour
		else
			time += "0" + this.hour
		if (this.minute >= 10)
			time += "" + this.minute
		else
			time += "0" + this.minute
		if (this.second >= 10)
			time += "" + this.second
		else
			time += "0" + this.second

		return time
	}
	showTimeString() {
		//고객에게 보여줄 목적으로 출
		let time = "" + this.year + "년 " + this.month + "월" + this.date + "일 "
		if (this.hour >= 10)
			time += "" + this.hour
		else
			time += "0" + this.hour
		time += "시 "
		if (this.minute >= 10)
			time += "" + this.minute
		else
			time += "0" + this.minute
		time += "분 "
		if (this.second >= 10)
			time += "" + this.second
		else
			time += "0" + this.second

		return time += "초"
	}
}