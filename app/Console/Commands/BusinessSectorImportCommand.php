<?php

namespace App\Console\Commands;

use App\Imports\BusinessSectorImport;
use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;


class BusinessSectorImportCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:bs';

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
	    Excel::import(new BusinessSectorImport(), public_path('/bs1.csv'));
    }
}
