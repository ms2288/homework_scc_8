function fail_message() {
    open_cancle_popup()
}

var time_pause = 0;
$(document).ready(function() {

    var seconds = 30;
    var minutes = 0;

    function calculate() {
        setTimeout(calculate, 1000);
        $('#showTime').html('0:' + minutes + '0:' + seconds);
        console.log(time_pause)
        if (time_pause == 0) {
            seconds--;
        } else {
            seconds;
        }
        if (seconds < 0) {
            seconds = 30;
            minutes--;
            if (minutes < 0) {
                minutes = 0;
                seconds = 0;

            }
            fail_message();

        }
    }

    calculate();
});

function finish_payment_and_move(location) {
    //JH    결제 완료됐다고 서버에 보내고 다음 창에도 전달하기
    const orderInfo = JSON.parse($("#order").val())

    let form = document.createElement("form");
    form.style.visibility = "hidden"; // no user interaction is necessary
    form.method = "POST"; // forms by default use GET query strings
    form.action = location;
    for (key of Object.keys(orderInfo)) {
        var input = document.createElement("input");
        input.name = key;
        input.value = orderInfo[key];
        form.appendChild(input); // add key/value pair to form
    }
    document.body.appendChild(form); // forms cannot be submitted outside of body
    form.submit(); // send the payload and navigate

}
//아래 두 함수는 기능이 단순하고 너무 중복돼서 pug파일에서 해당 파일을 위 함수로 바꾸고 아래는 없애는 것 추천
function change_to_checkpoint() {
    finish_payment_and_move('/change_to_checkpoint')
}
function change_to_complete() {
    finish_payment_and_move('/change_to_complete')
}

function open_checking_popup() {
    $('#checking').css('opacity', '1');
    $('#checking').css('visibility', 'visible')
    time_pause = 1;
    setTimeout(() => close_checking_popup(), 2500);
}

function open_checkpoint_popup() {
    $('#checkpoint').css('opacity', '1');
    $('#checkpoint').css('visibility', 'visible');
    time_pause = 1
}

function close_checking_popup() {
    $('#checking').css('opacity', '0');
    $('#checking').css('visibility', 'hidden')
    time_pause = 0
    setTimeout(() => open_checkpoint_popup(), 1000);
}

function close_checkpoint_popup() {
    $('#checkpoint').css('opacity', '0');
    $('#checkpoint').css('visibility', 'hidden')
    time_pause = 0
}

function open_cancle_popup() {
    $('#cancle').css('opacity', '1');
    $('#cancle').css('visibility', 'visible');
    time_pause = 1
    setTimeout(() => close_cancle_popup(), 2500);
}

function close_cancle_popup() {
    $('#cancle').css('opacity', '0');
    $('#cancle').css('visibility', 'hidden')
    time_pause = 0
}