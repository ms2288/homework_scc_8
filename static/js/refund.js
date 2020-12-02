let refund_list = []

$(document).ready(function () {
	//페이지가 로딩되면 데이터 div에 있는 정보를 변수로 저장한다.
	refund_list = JSON.parse($("#refund").val())

	//주문내역 중 하나를 클릭하면 하단에 상세 주문 내역을 표시한다.
	$("#table_order_list > tbody > tr").on('click', function () {
		$(".table > tbody > tr").css("background-color", "inherit")
		$(this).css("background-color", "skyblue")

		//테이블에서 선택한 주문내역의 인덱스로 어떤 주문인지 찾는다
		const index = parseInt($(this).children(0).html())
		const selected= refund_list[index]

		//상세 주문 내역 테이블을 보이게 한 후 내용을 채워넣는다
		$("#detailed_order").removeAttr("hidden")

		$(".order_id").text(`${selected.id}`)
		$(".order_orderTime").text(`${selected.orderTime}`)
		$(".order_price").text(`${selected.price}`)
	})
})