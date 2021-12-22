$(function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvasImage();

    //moveTo(x,y) : 기준점 정하는거
    //beginPath() : 한가지를 그리고 나면 반드시 이거 쓰기 안쓰면 이어짐

    //선 관련 정리
    //lineTo(x,y) : 선 추가
    //closePath() : 경로닫기
    //stroke() : 그려주는 거 이거 안쓰면 안보임

    //색 관련 정리
    //fillStyle = "color" : 내부 색깔을 color 색으로 지정
    //strokeStyle = "color" : 윤각선 색깔을 color 색으로 지정
    //fill() : 도형 내부칠하기 이거 안쓰면 안 칠해짐

    //사각형
    //fillRect(x,y,width,height) : 색칠된 직사각형을 그림(색은 fillStyle 로 조정)
    //strokeRect(x,y,width,height) : 직사각형 윤곽선을 그림

    //원
    //arc(x,y,(radius)반지름,startAngle,endAngle,anticlockwise) :
    // (x,y) 위치에 원점을 두고, 반지름 r을 가지고, startAngle 에서 시작하여 endAngle 에서 끝나고
    // anticlockwise 방향으로 향함 기본 값 = false - 시계방향 회전

    //텍스트
    //fillText('출력할 텍스트', x, y [,최대너비]) : 색이 채워져 있는 텍스트
    //strokeText('출력할 텍스트', x, y [,최대너비]) : 테두리만 있는 텍스트
    //textAlign = 'left, right, center, start, end' : 텍스트 가로 방향의 정렬 지정
    //textBaseline = 'top, middle, bottom, alphabetic, hanging, ideographic' : 텍스트 출력 기준선 설정

    //선
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(250, 25);
    ctx.stroke();

    //선으로 그린 사각형
    ctx.beginPath();
    ctx.moveTo(25, 50);
    ctx.lineTo(250, 50);
    ctx.lineTo(250, 250);
    ctx.lineTo(25, 250);
    ctx.closePath();
    ctx.stroke();

    //선으로 그린 색이 칠해진 사각형
    ctx.beginPath();
    ctx.moveTo(25, 275);
    ctx.lineTo(250, 275);
    ctx.lineTo(250, 525);
    ctx.lineTo(25, 525);
    ctx.closePath();
    ctx.fillStyle = "#00cccc";
    ctx.fill();
    ctx.stroke();

    //색칠된 사각형
    ctx.beginPath();
    ctx.fillStyle = "#fcba00";
    ctx.fillRect(275, 50, 225, 205);

    //외각선이 있는 사각형
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.strokeRect(275, 275, 225, 250);

    //색칠된 삼각형
    ctx.beginPath();
    ctx.moveTo(525, 50);
    ctx.lineTo(525, 250);
    ctx.lineTo(755, 250);
    ctx.fillStyle = "#5aff71";
    ctx.fill();

    //외각선이 있는 삼각형
    ctx.beginPath();
    ctx.moveTo(525, 275);
    ctx.lineTo(750, 275);
    ctx.lineTo(750, 525);
    ctx.closePath();
    ctx.stroke();

    //텍스트
    ctx.beginPath();
    ctx.font = '30px serif';
    ctx.fillText('Hello world', 25, 550);

    //외각선텍스트
    ctx.beginPath();
    ctx.font = '48px 맑은 고딕';
    ctx.textAlign = "left";
    // ctx.textBaseline = 'middle';
    ctx.strokeText('Hello world', 25, 590);

    //원
    ctx.beginPath();
    ctx.arc(70, 660, 50, 0, 7);
    ctx.fillStyle = "hotpink";
    ctx.fill();
//32123/100 * 100 1 ~ 100
    //별!
    ctx.beginPath();
    ctx.moveTo(190, 725);
    ctx.lineTo(400,725);
    ctx.lineTo(230,900);
    ctx.lineTo(295,640);
    ctx.lineTo(380,900);
    ctx.closePath();
    ctx.fillStyle = "Gold";
    ctx.fill();

    //곡선1
    ctx.beginPath();
    ctx.moveTo(550, 755);
    ctx.arcTo(600,525,800,700,100);
    ctx.lineTo(800,725);
    ctx.stroke();

    //곡선2
    // ctx.beginPath();
    // ctx.moveTo(700,700);
    // ctx.quadraticCurveTo(700,700,1000,1000);
    // ctx.stroke();


    //이미지
    function canvasImage() {
        var img = new Image();
        ctx.beginPath();
        ctx.drawImage(img, 25, 700, 100,100);
        img.src = './개구리.jpg';
    }



    // ctx.rect(20, 40, 50, 50);
    // ctx.fillStyle = "#FF0000";
    // ctx.fill();
    // ctx.closePath();
    //
    // ctx.beginPath();
    // ctx.arc(240, 160, 20, 0, Math.PI*2, false);
    // ctx.fillStyle = "green";
    // ctx.fill();
    // ctx.closePath();
    //
    // ctx.beginPath();
    // ctx.rect(160, 10, 100, 40);
    // ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    // ctx.stroke();
    // ctx.closePath();
})


// if(canvas.getContext){
//
// }

// 1,2,2,2,1,14,1,2,13,12,
// 1,24,12412,387125971925741254,125,129875125,125,125,125,12,51,251,25,1
// 버튼

//색상
// ctx.fillstyle = 'blue'
// ctx.stockestyle = 'red'
// ctx.fontstyle = 'arial 18px'
// new Image
// ctx.drawimage = ''
