<?php


namespace App\DesignPatterns\Structural;


use App\DesignPatterns\Behavioral\BetRegister;

class BetCommand implements Command
{
    private Receiver $output;
    /**
     * @var BetRegister
     */
    private BetRegister $betRegister;

    /**
     * Each concrete command is built with different receivers.
     * There can be one, many or completely no receivers, but there can be other commands in the parameters
     * @param Receiver $console
     */
    public function __construct(Receiver $console, BetRegister $betRegister)
    {
        $this->output = $console;
        $this->betRegister = $betRegister;
    }

    public function execute()
    {
        // TODO: Implement execute() method.
    }
}
