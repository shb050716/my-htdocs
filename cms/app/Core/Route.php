<?php

namespace App\Core;

class Route
{
	#property
	private static $GET = [];
	private static $POST = [];
	#get property function
	public static function get($url, $controller, $action)
	{
		self::addRoute($url, $controller, $action, 'GET');
	}

	public static function post($url, $controller, $action)
	{
		self::addRoute($url, $controller, $action, 'POST');
	}

	private static function addRoute($url, $controller, $action, $method)
	{
		return self::${$method}[] = [
			'url' => $url,
			'controller' => 'App\\Controller\\' . $controller,
			'action' => $action
		];
	}
	#Controller class action execution
	public static function run()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		$url = self::getURL();
		$data = self::${$method};

		foreach ($data as $item) {
			if ($url == $item['url']) {
				$controller = new $item['controller']();
				return $controller->{$item['action']}();
			}
		}
	}

	private static function getURL()
	{
		$url = "/";
		if (isset($_GET['url'])) {
			$url = "/" . rtrim($_GET['url']);
			$url = filter_var($url, FILTER_SANITIZE_URL);
		}
		return $url;
	}
}