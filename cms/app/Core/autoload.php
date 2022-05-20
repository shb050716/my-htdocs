<?php

function autoload($className)
{
	$prefix = 'App\\';
	$len = strlen($prefix);
    $relativeName = str_replace("\\", "/", substr($className, $len));
	$file = APP . "/" . $relativeName . '.php';

	if (file_exists($file)) {
		include_once $file;
	}
}

spl_autoload_register('autoload');