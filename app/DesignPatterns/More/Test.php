<?php


namespace App\DesignPatterns\More;


class Test
{
    public function testCanAddAttributeToEntity()
    {
        $colorAttribute = new Attribute('color');
        $colorSilver = new Value($colorAttribute, 'silver');
//        $colorBlack = new Value($colorAttribute, 'black');
        $memoryAttribute = new Attribute('memory');
        $memory8Gb = new Value($memoryAttribute, '8GB');

        $entity = new Entity('MacBook Pro', [$colorSilver, $memory8Gb]);


//        $entity->offsetGet($colorSilver);
        $values = $entity->getValues();

        dump($values->contains($colorSilver));

//        $value = $values->offsetGet($memory8Gb);
        $value = $values->current();
        dump($value);
        $values->next();
        $value = $values->current();
        dump($value);
//        foreach ($values as $key => $value) {
//            dump($value->getName());
//            dump($value->getAttribute()->getName());
//        }
//        dump($values);
//        dd($values->current());

        echo (string)$entity;
    }
}
