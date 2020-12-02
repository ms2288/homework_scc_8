//파는 상품의 클래스를 정의한다.

class Menu {
	constructor(cat = "", name = "", price = 0, quantity=0, image = "/static/picture/default.png", shot = 0, cream = false, cinnamon = false) {
		this.cat = cat
		this.name = name
		this.price = price
		this.quantity=quantity
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
			, 'shot' : this.shot
			, 'cream' : this.cream
			, 'cinnamon' : this.cinnamon
		}
	}
}

module.exports = Menu