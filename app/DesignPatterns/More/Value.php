<?php declare(strict_types=1);


namespace App\DesignPatterns\More;


class Value
{
    private Attribute $attribute;
    private string $name;

    public function __construct(Attribute $attribute, string $name)
    {
        $this->name = $name;
        $this->attribute = $attribute;

        $attribute->addValue($this);
    }

    public function getName()
    {
        return $this->name;
    }

    public function getAttribute()
    {
        return $this->attribute;
    }

    public function __toString(): string
    {
        return sprintf('%s: %s', (string) $this->attribute, $this->name);
    }
}
