<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RockPaperScissorsCommand extends Command
{
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'bet:rps {shape}';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Command description';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return int
	 */
	public function handle()
	{
		$shape = (int)$this->argument('shape');
		if ($shape > 2 || $shape < 0) {
			echo "bet > 0, 1, 2";
		}
		echo $this->bet($shape);
	}

	const ROCK_SHAPE = 0;
	const PAPER_SHAPE = 1;
	const SCISSORS_SHAPE = 2;

	const WIN = 1;
	const LOSE = -1;
	const DRAW = 0;

	private function bet($shape)
	{
		// Chỉ pháp
		// Chưởng pháp
		// Quyền pháp

		// Cước pháp
		// KIẾM PHÁP
		$random = rand(0, 2);

		echo $shape;
		echo $random;


		if ($shape === $random) return self::DRAW;

		switch ($shape) {
			case self::ROCK_SHAPE:
				if ($random === self::PAPER_SHAPE) {
					return self::LOSE;
				}
				return self::WIN;
			case self::PAPER_SHAPE:
				if ($random === self::SCISSORS_SHAPE) {
					return self::LOSE;
				}
				return self::WIN;
			case self::SCISSORS_SHAPE:
				if ($random === self::ROCK_SHAPE) {
					return self::LOSE;
				}
				return self::WIN;
		}
	}
}
