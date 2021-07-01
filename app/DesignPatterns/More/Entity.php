<?php declare(strict_types=1);


namespace App\DesignPatterns\More;

use SplObjectStorage;

class Entity
{
    /**
     * @var SplObjectStorage<Value,Value>
     */
    private SplObjectStorage $values;

    /**
     * @var string
     */
    private string $name;

    /**
     * @param string $name
     * @param Value[] $values
     */
    public function __construct(string $name, array $values)
    {
        /** @var SplObjectStorage<Value,Value> values */
        $this->values = new SplObjectStorage();
        $this->name = $name;

        foreach ($values as $value) {
            $this->values->attach($value);
        }
    }

    public function getValues() {
        return $this->values;
    }

    public function getName() {
        return $this->name;
    }

    public function __toString(): string
    {
        $text = [$this->name];

        foreach ($this->values as $value) {
            $text[] = (string) $value;
        }

        return join(', ', $text);
    }
}
