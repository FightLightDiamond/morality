<?php


namespace App\Http\Services;


class BookmarkService
{
	public function getBookmarkData(string $url)
	{
		$data = \OpenGraph::fetch($url, true);

		foreach (['title', 'description', 'image'] as $name) {
			$data[$name] = $this->getPropertyData($name, $data);
		}

		return $data;
	}

	private function getPropertyData(string $name, array $data)
	{
		if (isset($data[$name])
			&& $data[$name] === ''
			&& isset($data["twitter:{$name}"])
			&& $data["twitter:{$name}"] !== ''
		) {
			return $data["twitter:{$name}"];
		}
		return $data[$name] ?? '';
	}
}