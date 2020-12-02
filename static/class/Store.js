class Store {
	constructor(id = 0,pw=0, name = "", addr = "", ) {
		this.id = id
		this.name = name
		this.addr=addr
	}

	getValue() {
		return {
			"id": this.id
			, "name": this.name
			, "addr":this.addr
		}
	}
}

module.exports=Store