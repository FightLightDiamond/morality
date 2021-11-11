<?php

namespace App\Imports;


use App\Models\BusinessSector;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;

/**
 * Class VocabulariesImport
 * @package App\Imports
 */
class BusinessSectorImport implements ToCollection, WithCustomCsvSettings
{
	/**
	 * @param Collection $rows
	 * @return void
	 */
	public function collection(Collection $rows)
	{
		$rows->shift();
		$db = [];
		$id = 0;
		$keyLevel = [
			0 => [],
			1 => [],
			2 => [],
			3 => [],
			4 => [],
			5 => [],
			6 => [],
		];

//		dd($rows->toArray());


		foreach ($rows as $datum) {
			foreach ($datum as $index => $item) {
				if($index == 0) {
					if($item !== null) {
//						$db[] = [
//							'id' => ++$id,
//							'title' => $item,
//							'parentId' => 0
//						];
						BusinessSector::query()->create([
							'id' => ++$id,
							'title' => $item,
							'parentId' => 0
						]);
						$keyLevel[$index][] = $id;
					}
				} else {
					if($item !== null) {
//						$db[] = [
//							'id' => ++$id,
//							'title' => $item,
//							'parentId' => end($keyLevel[$index - 1])
//						];
						BusinessSector::query()->create([
							'id' => ++$id,
							'title' => $item,
							'parentId' => end($keyLevel[$index - 1])
						]);
						$keyLevel[$index][] = $id;
					}
				}
			}
		}
	}

	/**
	 * @return string[]
	 */
	public function getCsvSettings(): array
	{
		return [
//			'delimiter' => "\t"
			'input_encoding' => 'ISO-8859-1'
//			'delimiter' => ";"
		];
	}
}
