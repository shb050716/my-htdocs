let percentage = 0;

function event() {
    $(document)
        .on('click', '.push', percent)
        .on('click', '.reset', reset)
}

function chart() {
    var canvas = $("canvas")[0];
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.stroke();
}

function percent() {
    var canvas = $("canvas")[0];
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    chart();
    let value = $('.canvasNumber').val();
    value = value.split(",");
    let maxNum = 0;
    let minNum = 0;
    if (value) {
        let ele = '';
        value.forEach(function (e, idx) {
            let maxValue = Math.max(...value);
            let minValue = Math.min(...value);
            ele += e;
            maxNum = maxValue;
            minNum = minValue;
        })
    }
    let padding = 100;

    let widthSize = canvas.width - padding * 2;
    let heightSize = canvas.height - padding * 2;

    let saveBefore = heightSize + padding;

    let saveArc_height = canvas.height - padding;
    line_arc();
    function line_arc() {

        for (let i = 0; i <= value.length; i++) {
            percentage = parseInt(value[i]) / maxNum * 100;
            let xx = widthSize / value.length ;
            let x = xx * (i + 1) + padding;
            let y = heightSize / 100 * percentage - padding;


            let result_width = xx * i + padding  ;

            function chartArc() {
                ctx.beginPath();
                ctx.arc(result_width, saveArc_height, 4, 0, 2 * Math.PI);
                ctx.fillStyle = "blue";
                ctx.fill();

                saveArc_height = heightSize - y ;

                if(parseInt(value[i]) === maxNum){
                    result_width = xx * (i + 1) + padding;
                }

            }

            function chartLine() {
                ctx.beginPath();
                if(parseInt(value[i]) === maxNum){
                    ctx.beginPath();
                    ctx.moveTo(i * xx + padding, heightSize - y);
                }
                ctx.moveTo(i * xx + padding , saveBefore);
                saveBefore = heightSize - y;
                ctx.lineTo(x, heightSize - y);
                ctx.stroke();
            }

            chartLine();
            chartArc();
        }
    }
}

function reset() {
    var canvas = $("canvas")[0];
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    chart();
    let input = $('.canvasNumber')[0];
    input.value = null;
}

$(function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    event();
    chart();


});
