class Time extends Date {
	/*�Ͽ����ú��ʸ� ������ �ð� Ŭ���� 
	*
    * 14�ڸ� ���ڿ�, Ȥ�� ��,��,��,��,��,�ʸ� �Ű������� �־ ������ �ð� ����
    * 
    * Ȥ�� �ƹ��͵� ���� �ʾƼ� ������ �ð� ����
    * 
    * ������ ��ü�� 14�ڸ� string���� ��ȯ�� �� ����
    */

	constructor(y, m, d, hr, min, sec) {
		if (typeof (y) === typeof ("")) {
			//ù��° �Ű������� Ÿ���� ""�̶� ����(string��) ��� 14�ڸ��� �Ͽ����ú��ʷ� parse�Ͽ� �ð� ����
			let time = y.replace('T', '').replace(':', '').replace('-', '').replace(':', '').replace('-', '')//ISOtime�� ��ȯ ����

			y = parseInt(time.slice(0, 4))
			m = parseInt(time.slice(4, 6))-1
			d = parseInt(time.slice(6, 8))
			hr = parseInt(time.slice(8, 10))
			min = parseInt(time.slice(10, 12))
			sec = parseInt(time.slice(12, 14))

			super(y, m, d, hr, min, sec)
		}
		else if (typeof (y) === typeof (1)) {
			//ù ��° �Ű������� Ÿ���� 1�̶� ���� ���(������ ���) �״�� �Է��ؼ� �ð� ����
			super(y, m - 1, d, hr, min, sec)
		}
		else {
			//�Ű������� ���� ��� ���� �ð� ����
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
		//DB �Է¿�
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
		//������ ������ �������� ��
		let time = "" + this.year + "�� " + this.month + "��" + this.date+"�� "
		if (this.hour >= 10)
			time += "" + this.hour
		else
			time += "0" + this.hour
		time+="�� "
		if (this.minute >= 10)
			time += "" + this.minute
		else
			time += "0" + this.minute
		time+="�� "
		if (this.second >= 10)
			time += "" + this.second
		else
			time += "0" + this.second

		return time+="��"
	}
}

module.exports = Time
