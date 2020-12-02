const Menu = require("./static/class/Menu")
const OrderList = require("./static/class/ShoppingCart")
const Time = require("./static/class/Time")
const mysql = require("mysql")

const ServerLog = require("./static/class/ServerLog")
const Log = new ServerLog

const DB = mysql.createConnection({
	host: 'localhost'
	, port: 3306
	, user: 'root'
	, password: '1234'
	, database: 'megacoffeedb'
})

class DB_adapter {
	//어댑터 패턴, DB에서 요청한 결과를 object로 가공해서 반환
	constructor() {
		DB.connect((err) => {
			if (err) throw err
			Log.tell(`DATABASE CONNECTED`)
		})
	}

	getMenuCore() {
		return new Promise((resolve, reject) => {
			DB.query(`select * from menu order by cat asc`, (err, result) => {
				return (err) ? reject(err) : resolve(result)
			})
		})
	}
	async getMenu() {
		//DB에서 데이터를 result에 받은 다음 그 데이터로 메뉴 객체를 만든 다음 그것을 반환한다. 
		let ret = []
		let menuListRaw = []

		await this.getMenuCore().then((result) => { menuListRaw = result }) //DB에서 모든 값이 넘어올 때까지 기다려서 실행한다.
		for (const i of menuListRaw) {
			ret.push(new Menu(
				i.Cat
				, i.Name
				, i.Price
				, 0
				, (i.Image) ? i.Image : undefined
				, (i.S || i.SW || i.SS) ? true : false
				, (i.W || i.SW) ? true : false
				, (i.SS) ? true : false
			))//DB에서 전달받은 raw 데이터에서 카테고리, 이름, 가격, 이미지(null -> default), 샷, 크림, 시나몬
		}
		return ret
	}

	getOrderListCore(key = "", val = "") {
		if (key != "") {
			return new Promise((resolve, reject) => {
				DB.query(`select * from orderlist where ${key} like ${val}`, (err, result) => {
					return (err) ? reject(err) : resolve(result)
				})
			})
		}
		else {
			return new Promise((resolve, reject) => {
				DB.query(`select * from orderlist`, (err, result) => {
					return (err) ? reject(err) : resolve(result)
				})
			})
		}
	}
	async getOrderList() {
		let ret = []
		let orderListRaw = []

		await this.getOrderListCore().then((result) => { orderListRaw = result })
		for (const i of orderListRaw) {
			ret.push(new OrderList(0, 0, 0, i.Price, i.Quantity))  //.setIdArb("" + String(parseInt(Math.random() * 2020)).padStart(4, '0') + "05140809110204")  임시로 붙인 ID, 다음에 데이터베이스까지 수정해야 함
		}

		return ret
	}

	setOrderListCore(order) {
		return new Promise((resolve, reject) => {
			const orderTime = new Time(order.id).getTimeDBString()
			DB.query(`insert into orderlist(id,customer,time,name,price,quantity) values('${order.id}', 0, '${orderTime}', '', ${order.price}, ${order.quantity})`, (err, result) => {
				return (err) ? reject(err) : resolve(result)
			})
		})
	}
	async setOrderList(order) {
		let inputResult = false
		await this.setOrderListCore(order).then(() => { })
		await this.getOrderListCore("id", order.id).then((result) => { inputResult = (result) ? true : false })

		return inputResult
	}

	getSalesCore(period) {
		return new Promise((resolve, reject) => {
			//time/daily/monthly에 따라 다른 query
			let query_string = ""
			if (period == "time") {
				query_string = "SELECT time, Quantity from orderlist where Date(time) = Date(CURDATE())"
			}
			else {
				const interval = `${(period == "daily") ? "7 DAY" : "6 MONTH"}`
				query_string = `SELECT time, Totalprice from orderlist WHERE time > DATE_FORMAT( DATE_ADD(NOW(), INTERVAL - ${interval}), '%Y-%m-%d 00:00:00' )`
			}
			//데이터가 많이 들어있지 않으므로 일단 전체를 가져오도록 한다. 추후 장바구니, 결제, DB에 주문내역 저장이 만들어지면 조건에 맞는 것을 가져오도록 바꾼다.
			query_string = "SELECT * from orderlist"
			DB.query(query_string, (err, result) => {
				return (err) ? reject(err) : resolve(result)
			})
		})
	}
	async getSales(period) {
		//DB 출력 결과를 받아 가공함
		let ret = []
		let salesRaw = []
		await this.getSalesCore(period).then((result) => { salesRaw = result })
		for (const i of salesRaw) {
			ret.push({ "time": new Time(i.Time.getFullYear(), i.Time.getMonth(), i.Time.getDate(), i.Time.getHours(), i.Time.getMinutes(), i.Time.getSeconds()), "price": i.TotalPrice })
		}

		console.log(`\t\t${ret}\n`);
		return ret;
	}

	getStampCore(tel) {
		return new Promise((resolve, reject) => {
			DB.query(`select * from stamp where ph like ${tel}`, (err, result) => {
				return (err) ? reject(err) : resolve(result)
			})
		})
	}
	setStampCore(tel, stampNum) {
		return new Promise(async (resolve, reject) => {
			//전화번호가 있는지 확인하고 있으면 가산, 없으면 등록 후 스탬프 개수 저장
			await this.getStampCore(tel).then((result) => {
				let queryString = ``
				if (result.length != 0) {
					//mutex 락 -> 업데이트 -> 셀렉트 -> 언락
					queryString = `update stamp set stamp = stamp + ${stampNum} where ph like ${tel};`
				}
				else {
					queryString = `insert into stamp (ph, stamp,Date, ExpDate) values(${tel},${stampNum} ,curdate(),curdate() + INTERVAL 1 YEAR);`
				}
				Log.tell(`QUERY: ${queryString}`)
				DB.query(queryString, (err, result) => {
					return (err) ? reject(err) : resolve(result)
				})
			})
		})
	}
	async setStamp(tel, stampNum) {
		let stampResult = {}
		await this.setStampCore(tel, stampNum).then((result) => { })
		await this.getStampCore(tel).then((result) => { stampResult=result })

		Log.tell(`query result: ${JSON.stringify(stampResult)}`, false)
	}
}

module.exports = DB_adapter

