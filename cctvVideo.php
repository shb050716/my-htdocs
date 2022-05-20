<?php

$file = '../video.mp4';
$fp = fopen($file,'rb');
$size = filesize($file);

$range = explode('-',explode('=',$_SERVER['HTTP_RANGE'])[1]);
$v_end = $size - 1;
$r_end = !empty($range[1]) ? $range[1] : $size;

$start = $range[0];
$end = ($r_end > $v_end) ? $v_end : $r_end;

fseek($fp,$start);

header('HTTP/1.1 206 Partial Content');
header('Content-type: video/mp4');
header("Accept-Ranges: bytes");
header("Content-Range: bytes $start-$end/$size");
header("Content-Length: " . ($end - $start + 1));

$buffer = 1024 * 8;
while(!feof($fp) && ($p = ftell($fp)) <= $end) {
    if($p + $buffer > $end) {
        $buffer = $end - $p + 1;
    }

    set_time_limit(0);
    echo fread($fp,$buffer);
    flush();
}

fclose($fp);