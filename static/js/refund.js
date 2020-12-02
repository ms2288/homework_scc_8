let refund_list = []

$(document).ready(function () {
	//�������� �ε��Ǹ� ������ div�� �ִ� ������ ������ �����Ѵ�.
	refund_list = JSON.parse($("#refund").val())

	//�ֹ����� �� �ϳ��� Ŭ���ϸ� �ϴܿ� �� �ֹ� ������ ǥ���Ѵ�.
	$("#table_order_list > tbody > tr").on('click', function () {
		$(".table > tbody > tr").css("background-color", "inherit")
		$(this).css("background-color", "skyblue")

		//���̺��� ������ �ֹ������� �ε����� � �ֹ����� ã�´�
		const index = parseInt($(this).children(0).html())
		const selected= refund_list[index]

		//�� �ֹ� ���� ���̺��� ���̰� �� �� ������ ä���ִ´�
		$("#detailed_order").removeAttr("hidden")

		$(".order_id").text(`${selected.id}`)
		$(".order_orderTime").text(`${selected.orderTime}`)
		$(".order_price").text(`${selected.price}`)
	})
})