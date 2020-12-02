function check() {

}

function number0() {
    $('#insert_num').append('0')
}

function number1() {
    $('#insert_num').append('1')
}

function number2() {
    $('#insert_num').append('2')
}

function number3() {
    $('#insert_num').append('3')
}

function number4() {
    $('#insert_num').append('4')
}

function number5() {
    $('#insert_num').append('5')
}

function number6() {
    $('#insert_num').append('6')
}

function number7() {
    $('#insert_num').append('7')
}

function number8() {
    $('#insert_num').append('8')
}

function number9() {
    $('#insert_num').append('9')
}

function delete_one() {
    var num = $('#insert_num').text()
    num = num.slice(0, -1)
    $('#insert_num').empty()
    $('#insert_num').text(num)
}

function delete_all() {
    $('#insert_num').empty()
}