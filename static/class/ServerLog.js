class ServerLog {
	tell(msg = "", show_info = true, indent = 1) {
		const msg_list = msg.split("\n")
		const msg_num = msg_list.length
		let indent_str = ""
		let i = 0

		for (i = 0; i < indent; i++) {
			indent_str += "\t"
		}

		i = 0
		if (show_info == true) {
			console.log(`[${Date()}]\nTEAM13>> ${msg_list[i]}`)
			i++
		}
		for (; i < msg_num; i++) {
			console.log(`${indent_str}${msg_list[i]}`)
		}
	}
}
module.exports=ServerLog