const express = require("express")
const bodyParser = require('body-parser')
const localsMiddleware = require("./middleware")

const app = express()
const PORT = 4000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(localsMiddleware.localsMiddleware)
app.set("view engine", "pug")
app.use("/static", express.static("static"))

const partials = {
	header: 'partials/header',
	footer: 'partials/footer'
};
require('./routes')(app, partials)

const DB = require("./DB")

app.listen(PORT, () => {
	console.log(`[${Date()}]\nTEAM13>> SERVER RUNNING...\thttp://127.0.0.1:${PORT}`)
})