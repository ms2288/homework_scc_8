// JavaScript source code
$(document).ready(function () {
	$(".exe_test").click(function () {
		const period = {"period":"daily"}

		const xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/test");
		xhttp.setRequestHeader("Content-Type", "application/json");
		xhttp.onload = () => {
			console.log(xhttp.responseText)
		}
		xhttp.send(JSON.stringify(period));
	})
})