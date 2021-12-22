<?php
//    $file_ext = 'jpg';
//
//    if($file_ext == 'jpg' || $file_ext == 'gif' || $file_ext == 'bmp'){
//        echo 'if 이미지 파일'.'</br>';
//    } elseif ($file_ext == 'avi' || $file_ext == 'mp4' || $file_ext == 'fiv'){
//        echo 'if 동영상 파일'.'</br>';
//    } else {
//        echo 'if 텍스트 파일'.'</br>';
//    }
//
//
//    switch($file_ext){
//        case 'jpg' :
//        case 'gif' :
//        case 'bmp' :
//            echo 'switch 이미지 파일'.'</br>';
//        break;
//
//        case 'avi' :
//        case 'mp4' :
//        case 'fiv' :
//            echo 'switch 동영상 파일'.'</br>';
//        break;
//
//        default :
//            echo 'switch 텍스트 파일'.'</br>';
//        break;
//    }

//    for($i = 0, $j = 0; $i <= 100; $i ++){
//         $j += $i;
//    }
//    echo $j;

//    for ($i = 1; $i < 500; $i++) {
//        if ($i % 2 === 1) {
//            echo $i.' ';
//        }
//        if($i % 10 === 0) {
//            echo '</br>';
//        }
//    }

// 문제 1번
//    for($i = 1; $i <= 9; $i ++) {
//        for($j = 2; $j <= 5; $j ++) {
//            echo $j. ' * ' .$i.' = '. $j * $i.'&nbsp;&nbsp;&nbsp;&nbsp;';
//        }
//        echo '</br>';
//    }
//    echo '</br>';
//    for($i = 1; $i <= 9; $i ++) {
//        for($j = 6; $j <= 9; $j ++) {
//            echo $j. ' * ' .$i.' = '. $j * $i.'&nbsp;&nbsp;&nbsp;&nbsp;';
//        }
//        echo '</br>';
//    }

//문제 2번
// $line = 5;
// for($i = 1; $i <= $line; $i++){
// 	for($j = $line; $j > $i; $j--){
// 		echo '-';
// 	}
// 	for($j = 1; $j <= $i; $j++){
// 		echo "*";
// 	}
// 	for($j = 2; $j <= $i; $j++){
// 	    echo "*";
//    }
// 	echo '</br>';
// }

//$line = 5;
//    for($i = 1; $i <= $line; $i++){
//        for($j = 1; $j <= $line; $j++){
//            echo "*";
//        }
//        echo'</br>';
//    }


//문제 4번

//$result = 0;
//for($i = 1; $i <= 800; $i++){
//    if($i % 5 == 0){
//        continue;
//    }
//    $result += $i;
//    echo $i.' 까지의 합 '.$result;
//
//    echo '</br>';
//}

//문제 5번
//$m = 0.9144;
//echo '야드&nbsp;&nbsp;&nbsp;&nbsp;미터';
//$i = 0;
//$i+=10;
//
//for($i = 10 ; $i <= 300; $i+=10){
//
//
//for($i = 1; $i <= 300; $i++){
//    if($i % 10 == 0){
//        echo '</br>';
//        echo $i.'&nbsp;&nbsp;&nbsp;&nbsp;'.$i * $m;
//    }
//}

//문제 6번


//1~100 까지의 배열
//for($i = 1; $i <= 100; $i++){
//    $data[$i] = $i;
//}
//print_r($data);

// 지역명에 맞는 지역번호를 출력.
//$data = ['서울' => '02', '경기' => '031', '인천' => '032', '강원' => '033', '충남' => '041', '대전' => '042',
//    '충북' => '043', '세종' => '044', '부산' => '051', '울산' => '052', '대구' => '053', '경북' => '054',
//    '경남' => '055', '전남' => '061', '광주' => '062', '전북' => '063', '제주' => '064'];
//
//foreach ($data as $key => $value) {
////    echo $key . ' : ' . $value;
////    echo $value;
//}
//print_r($data);
//var_dump($data);

//만나이 계산하기

//$arr_today = array('year' => 2021, 'month' => 10, 'day' => 23);
//$arr_birth = array('year' => 2005, 'month' => 7, 'day' => 16);
//
//function my_age($arr_today, $arr_birth)
//{
//    $age = $arr_today['year'] - $arr_birth['year'];
//
//    if ($arr_birth['month'] < $arr_today['month']) {
//        if ($arr_birth['day'] < $arr_today['day']) {
//            $age = $age + 1;
//        }
//    } else if ($arr_birth['month'] == $arr_today['month']) {
//        if ($arr_birth['day'] < $arr_today['day']) {
//            $age = $age + 1;
//        }
//    }
//
//    return $age;
//}
//
//echo my_age($arr_today, $arr_birth);
//
//function howoldyou($howage)
//{
//    if ($howage <= 4) {
//        return 'baby';
//    } else if (4 < $howage && $howage <= 13) {
//        return 'child';
//    } else if ($howage <= 19) {
//        return 'young';
//    } else if ($howage <= 59) {
//        return 'adult';
//    } else {
//        return 'old';
//    }
//}
//
//echo howoldyou(my_age($arr_today, $arr_birth));

//문제 6번 1 ~ 1000 까지의 자연수 중에 소수를 출력하기

//for($i = 1; $i <= 1000; $i++){
//    $num = 0;
//    for($j =1; $j <= $i; $j++){
//        if($i % $j == 0){
//            $num += 1;
//        }
//    }
//    if($num == 2){
//        echo $i.'</br>';
//    }
//}

//1~36사이에 중복되지않게 6자리의 번호 추출




?>
