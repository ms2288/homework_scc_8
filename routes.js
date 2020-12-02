const Time=require("./static/class/Time")
const DB = require("./DB")
let DB_adapter = new DB()
const ServerLog = require("./static/class/ServerLog")
const Log = new ServerLog()

module.exports = (app, partials) => {
	app.get(routes.cover, (req, res) => {
		res.render("cover", { routes })
	})

	app.get(routes.menu, async (req, res) => {
		Log.tell("Menu Page Requested")

		let menu = []
		await DB_adapter.getMenu().then((ret) => { menu = ret })//가공된 값이 모두 넘어올 때까지 기다렸다 처리
		res.render("menulist", { routes, menu })
	})

	//JH	결제요청으로 전송된 json 받고 check 페이지로 넘어가기
	app.post(routes.check, (req, res) => {
		Log.tell("Payment Requested")

		const order = req.body

		const timestr = new Time(order.id).getTimeDBString()
		res.render("check", { routes, order,timestr })
	})

	app.post(routes.change_to_checkpoint, (req, res) => {
		Log.tell("Stamp Requested")

		const order = req.body

		res.render("numberpad", { routes, order })
	})

	app.post(routes.stamp, async (req, res) => {
		Log.tell(`Stamp Accumulation Requested`)

		const stampInfo = req.body

		Log.tell(`Phone numer: ${stampInfo["ph"]}\tstamp: ${stampInfo["stamp"]}`, false)

		await DB_adapter.setStamp(stampInfo["ph"], stampInfo["stamp"]).then((ret) => {
			Log.tell(ret)
		})
	})
	app.post(routes.change_to_complete, async (req, res) => {
		Log.tell("Payment Complete Requested")

		const order = req.body
		await DB_adapter.setOrderList(order).then((ret) => {
			Log.tell(`Saving Order Information: ${ret}`, false, 1)
		})

		const timestr = new Time(order.id).getTimeDBString()
		res.render("complete", { routes, order, timestr})	
	})

	app.get(routes.refund, async (req, res) => {
		let refund = []
		await DB_adapter.getOrderList().then((ret) => { refund = ret })
		//JH 201121 주문내역 엄청 많이 나오도록 테스트를 위해 
		refund = refund.concat(refund)
		refund = refund.concat(refund)
		refund = refund.concat(refund)
		refund = refund.concat(refund)
		refund = refund.concat(refund)
		refund = refund.concat(refund)
		res.render("refund", { routes, refund })
	})

	app.get(routes.timesales, (req, res) => {
		res.sendFile("sales/timesales.php")
	})

	app.get(routes.managerpage, (req, res) => {
		res.render("managerpage", { routes })
	})

	//JH	test페이지 내의 기능 테스트
	app.get(routes.test, (req, res) => {
		res.render("test", { routes })
	})
	app.post(routes.test, async (req, res) => {
		let result = []
		await DB_adapter.getSales(req.body["period"]).then((ret) => { result = ret })
		res.send(result)
	})
}

const routes = {
	cover: "/"
	, menu: "/menu"

	, check: "/check"
	, change_to_complete: "/change_to_complete"
	, change_to_checkpoint: "/change_to_checkpoint"
	, stamp: "/stamp"

	, managerpage: "/managerpage"
	, refund: "/refund"
	, timesales: "/timesales"

	, test: "/test"
}

export default routes
