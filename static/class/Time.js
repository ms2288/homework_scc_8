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
			m = parseInt(time.slice(4, 6))-1
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
		let time = "" + this.year + "년 " + this.month + "월" + this.date+"일 "
		if (this.hour >= 10)
			time += "" + this.hour
		else
			time += "0" + this.hour
		time+="시 "
		if (this.minute >= 10)
			time += "" + this.minute
		else
			time += "0" + this.minute
		time+="분 "
		if (this.second >= 10)
			time += "" + this.second
		else
			time += "0" + this.second

		return time+="초"
	}
}

module.exports = Time
