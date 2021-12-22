let savePath = [];
let order = 0;
let startX = 0;
let startY = 0;
let check = false;
let deletePath = [];
let freePath = new Path2D();
let linePath = new Path2D();
let rectPath = new Path2D();
let arcPath = new Path2D();
let changeB = 1;
let fontValue = '16px serif';
let colorValue = 'black';
let selectType = '';

$(function () {
    event();
});

function event() {
    $(document)
        .on('mousedown', '#canvas', mouseDown)
        .on('mousemove', '#canvas', mouseMove)
        .on('mouseup', '#canvas', mouseUp)
        .on('mouseout', '#canvas', mouseOut)
        .on('click', '.reset', reset)
        .on('click', '.delete', deleteClick)
        .on('change', '.border', changeBorder)
        .on('change', '#color', selectColor)
        .on('change', '.selectBtn', selectFilter)
        .on('change','.text',fontSizeValue)
        .on('click','.download', download)
}

function selectFilter () {
    selectType = $(this).attr('id');
}

function changeBorder () {
    changeB = parseInt($('.border').val());
}

function selectColor() {
    colorValue = $('#color option:selected').val();
}

function fontSizeValue () {
    fontValue = $('.text').val();
}

function reset() {
    let canvas = $("canvas")[0];
    let ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    savePath = [];
    deletePath = [];
}

function deleteClick() {
    let canvas = $("canvas")[0];
    let ctx = canvas.getContext("2d");
    if (selectType === 'select') {
            savePath.splice(savePath.length - 1, 1);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    }
}

function download () {
    let canvas = $("canvas")[0];
    let ctx = canvas.getContext("2d");

    let down = canvas.toDataURL('image/png');
    $('.url').attr('href', down) ;

}

function Drawing(drawX, drawY) {
    let canvas = $("canvas")[0];
    let ctx = canvas.getContext("2d");

    ctx.lineWidth = changeB;
    ctx.strokeStyle = colorValue;

    if (selectType === 'free') {
        freePath.moveTo(startX, startY);
        freePath.lineTo(drawX, drawY);
        ctx.stroke(freePath);
    }

    if (selectType === 'line') {
        linePath.moveTo(startX, startY);
        linePath.lineTo(drawX, drawY);
        ctx.stroke(linePath);
    }

    if (selectType === 'rect') {
        rectPath.rect(startX, startY, drawX - startX, drawY - startY);
        ctx.stroke(rectPath);
    }

    let powX = Math.pow(drawX - startX, 2);
    let powY = Math.pow(drawY - startY, 2);
    let absoluteValue = Math.abs(powX + powY);
    if (selectType === 'arc') {
        arcPath.arc(startX, startY, Math.sqrt(absoluteValue), 0, 2 * Math.PI);
        ctx.stroke(arcPath);
    }
}

function draw(){
    let canvas = $("canvas")[0];
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);
    savePath.forEach(e => {
        if(e.type === 'path') {
            ctx.strokeStyle = e.color;
            ctx.lineWidth = e.border;
            ctx.stroke(e.path);
        }
        if(e.type === 'text'){
            ctx.font = e.fontSize;
            ctx.fillStyle = e.color;
            ctx.fillText(e.text,e.locationX,e.locationY);
        }
    })
}

function mouseUp(e) {
    let canvas = $("canvas")[0];
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);
    check = false;
    if (selectType === 'line') {
        savePath.push({'order' : order += 1,'type' : 'path','path' : linePath, 'border' : changeB, 'color' : colorValue});
        linePath = new Path2D();
    }

    if (selectType === 'free') {
        savePath.push({'order' : order += 1,'type' : 'path','path' : freePath, 'border' : changeB, 'color' : colorValue});
        freePath = new Path2D();
    }

    if (selectType === 'rect') {
        savePath.push({'order' : order += 1,'type' : 'path','path' : rectPath, 'border' : changeB, 'color' : colorValue});
        rectPath = new Path2D;
    }

    if (selectType === 'arc') {
        savePath.push({'order' : order += 1,'type' : 'path','path' : arcPath, 'border' : changeB, 'color' : colorValue});
        arcPath = new Path2D();
    }
    draw();
    if(selectType === 'select') {
        savePath.forEach(function(e, idx) {
            let find = savePath[idx];
            if (ctx.isPointInStroke(e.path, startX, startY)) {
                savePath.splice(idx, 1);
                savePath.push(find);
            }
        })
    }
    let canvasUrl = canvas.toDataURL();
    console.log(canvasUrl);
}

function mouseDown(e) {
    let canvas = $('canvas')[0];
    let ctx = canvas.getContext("2d");

    ctx.strokeStyle = colorValue;
    check = true;
    startX = e.offsetX;
    startY = e.offsetY;
    if (selectType === 'text'){
        let text = prompt();
        ctx.font = fontValue + 'px serif';
        ctx.fillStyle = colorValue;
        ctx.fillText(text,e.offsetX,e.offsetY);
        savePath.push({'type' : 'text','text' : text, 'fontSize' : fontValue + 'px serif', 'color' : colorValue,'locationX' : startX,'locationY' : startY});
    }
}

function mouseMove(e) {
    if(selectType === 'text'){
        return
    }
    let canvas = $('canvas')[0];
    let ctx = canvas.getContext("2d");
    let drawX = e.offsetX;
    let drawY = e.offsetY;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    draw();

    ctx.strokeStyle = colorValue;
    if (check === false) {
        return
    }

    if (selectType === 'line') {
        linePath = new Path2D();
    }

    if (selectType === 'rect') {
        rectPath = new Path2D();
    }

    if (selectType === 'arc') {
        arcPath = new Path2D();
    }
    Drawing(drawX, drawY);
    if (selectType === 'free') {
        startX = drawX;
        startY = drawY;
    }
}

function mouseOut(e) {
    check = false;
}