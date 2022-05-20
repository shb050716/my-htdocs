<?php

function parseURL($n)
{
	if (isset($_GET['url'])) {
		return explode("/", $_GET['url'])[$n];
	}
}

function saveImg($file)
{
	$path = '/resources/file' . time() . $file['name'];

	move_uploaded_file($file['tmp_name'], "." . $path);

	return $path;
}