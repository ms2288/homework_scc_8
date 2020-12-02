const Menu = require("./Menu")
const Time = require("./Time")
const Store = require("./Store")

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

module.exports = ShoppingCart
module.exports = OrderList

