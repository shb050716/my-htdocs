<?php

namespace App\Core;

class DB
{
	private static $pdo = null;

	private static function connect()
	{
		if (is_null(self::$pdo)) {
			$pdo = new \PDO('mysql:host=localhost;charset=utf8;dbname=DBname', 'root', '');
			$pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_WARNING);
			$pdo->setAttribute(\PDO::ATTR_EMULATE_PREPARES, FALSE);
			self::$pdo = $pdo;
		}

		return self::$pdo;
	}

	public static function execute($sql, $arr = null)
	{
		$stmt = self::connect()->prepare($sql);
		$stmt->execute($arr);
		return $stmt;
	}

	public static function fetch($sql, $arr = null)
	{
		return self::execute($sql, $arr)->fetch();
	}

	public static function fetchAll($sql, $arr = null)
	{
		return self::execute($sql, $arr)->fetchAll();
	}

	public static function rowCount($sql, $arr = null)
	{
		return self::execute($sql, $arr)->rowCount();
	}
	
	public static function lastInsertId()
	{
		return self::connect()->lastInsertId();
	}
}