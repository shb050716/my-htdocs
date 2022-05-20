<?php

namespace App\Core;

class Controller
{
	protected function alert($msg)
	{
		echo "
			<script>
				alert('$msg');
			</script>
		";
		return $this;
	}

	protected function move($url)
	{
		echo "
			<script>
				location.href = '$url';
			</script>
		";
	}

	protected function back()
	{
		echo "
			<script>
				history.back();
			</script>
		";
	}

	protected function inspection()
	{
		if (!isset($_SESSION['id'])) {
			$this->alert('로그인해 주세요.')->back();
			exit();
		};
	}

	protected function isVal(...$arr)
	{
		foreach ($arr as $item) {
			if (empty($item)) {
				$this->alert('모든항목을 기입해주세요.')->back();
				exit();
			}
		}
	}

}