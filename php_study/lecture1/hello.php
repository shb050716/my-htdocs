<?php
$child_fee = 5000;  //청소년입장료 5000원
$adult_fee = 8000;    //성인입장료 8000원
$num_child = 3;   //청소년3매
$num_adult = 2;   //성인2매


$total_fee = $child_fee * $num_child + $adult_fee * $num_adult;

echo '전체 입장료 :' .$total_fee. '원 <br>';

$money = 3000; //지불한 돈
$price = 800; //물건 가격
$num = 3; //구매 개수

$change = $money - $price * $num;

echo('물건 가격 :' .$price. '<br>');
echo('구매 개수 :' .$num. '<br>');
echo('지불 금액 :' .$money. '<br>');
echo('거스름돈은' .$change.'원 입니다 <br>');

$a = 30;
$b = 10;

$c = $a + $b;

$a++;
$b--;

$a -= 2;
$b *= 3;
$b %= 7;
$c = $a * $b;

echo $c;
?>


