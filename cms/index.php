<?php

#define
define('ROOT', $_SERVER['DOCUMENT_ROOT']);
define('APP', ROOT . '/app');
define('CORE', APP . '/Core');
define('VIEW', APP . '/View');

#setting
session_start();
date_default_timezone_set('Asia/Seoul');
error_reporting(E_ALL);
ini_set('display_errors', 1);

#include
include_once CORE . '/autoload.php';
include_once CORE . '/lib.php';
include_once CORE . '/routes.php';