function open_receipt_popup() {
	$('#receipt').css('opacity', '1');
	$('#receipt').css('visibility', 'visible')
	setTimeout(() => { close_receipt_popup() }, 3500);
}

function close_receipt_popup() {
	$('#receipt').css('opacity', '0');
	$('#receipt').css('visibility', 'hidden')
}


$(document).ready(function () {
	open_receipt_popup()

	//8초 후 처음으로 돌아감
	setTimeout(() => { window.location.href = "/" }, 8000)
});