<?php


namespace App;



class Math
{
	/**
	 * @var Calculate
	 */
	public $calculate;
	/**
	 * Math constructor.
	 *
	 * @param Calculate $calculate
	 */
	public function __construct(Calculate $calculate)
	{
		$this->calculate = $calculate;
	}
	/**
	 * Get Area
	 *
	 * @param $length
	 *
	 * @return float|int
	 */
	public function getArea($length)
	{
		return $this->calculate->areaOfSquare($length);
	}
}