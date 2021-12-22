$(() => {
    $(document)
        .on('click', '.push', view)

    view();
})

function view (){
    let canvas = $('canvas')[0];
    let ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeRect(0,0,canvas.width,canvas.height);
    ctx.stroke();

    let padding = 50;
    let width = canvas.width - padding * 2;
    let height = canvas.height - padding * 2;

    let value = $('input').val();
    let valueArr = value.split(",");

    let min = Math.min(...valueArr);
    let max = Math.max(...valueArr) - min;

    let canvasX = width / (valueArr.length - 1);

    let getLocation = idx => {
        let x = canvasX * idx + padding;
        let y = padding + height - height * (valueArr[idx] - min) / max;

        return [x,y];
    }
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.moveTo(...getLocation(0));

    valueArr.forEach(function (e, idx){

        ctx.lineTo(...getLocation(idx));
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(...getLocation(idx),4,0,2 * Math.PI);
        ctx.fill();

        ctx.moveTo(...getLocation(idx));
    })
}