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

module.exports = Stamp