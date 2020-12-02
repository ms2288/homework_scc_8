const Menu = require("./Menu")
const Time = require("./Time")
const Store = require("./Store")

class ShoppingCart {
	//����īƮ�� ���Ǵ� Ŭ�����̴�. ���õ� �޴��� �����Ͽ� �ֹ� ������ ��ü�� ����� ��ȯ�Ѵ�. 
	//�� ��ü�� DB�� ��������� �ʰ� �� Ŭ������ �����ϴ� �ֹ� ���� ��ü�� DB�� ����ȴ�. 

	constructor(storeNum, orderNum) {
		this.storeNum = storeNum
		this.orderNum = orderNum

		this.menus = []
		this.price = 0
		this.quantity = 0
	}

	//����īƮ �ʱ�ȭ
	initiate() {
		this.menus = []
		this.price = 0
		this.quantity = 0
	}

	//�޴� �߰�/����
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

	//�ֹ����� ���� �� ����īƮ �ʱ�ȭ
	constructOrderList() {
		//�ֹ���ȣ�� �������� �ٲ� ���� �ǵ��� �ؾ� �ϴµ� �� �κп��� ������ �ֽ��ϴ�. ��ġ�µ� ���� ������ �� ���Ƽ� ���Ŀ� �����ϵ��� �ҰԿ�
		const ret = new OrderList(this.storeNum, this.orderNum, this.menus, this.price, this.quantity)

		this.orderNum++
		if (this.orderNum / 100 == 0) orderNum -= 100 //ex) 600������ 699������ ��ȯ �� 700���� �θ� ���ʰ� �Ǹ� 100�� ���� 600������ ���ư�����
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
		this.id = this.orderTime.getTimeString() + String(this.storeNum)//�ð� 14�ڸ� + �����ȣ 4�ڸ�
	}

	setIdArb(input_id) {
		//���Ƿ�(arbitrary) id�� �ο��Ѵ�.
		//id�� 18�ڸ� ���ڿ��̸� ���ǿ� �������� ���� ��� 000000000000000000���� �Ѵ�
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

