<?php

namespace App\Controller;

#use javascript function
use App\Core\Controller;
#use DB
use App\Core\DB;

class MainController extends Controller
{
	#page include
	public function index()
	{
		include_once VIEW . '/template/header.php';
		include_once VIEW . '/index.php';
		include_once VIEW . '/template/footer.php';
	}
}