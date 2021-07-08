<?php


namespace App\DesignPatterns\Structural;


use Illuminate\Support\Arr;

class Receiver
{
    /**
     * @var array|int[]
     */
    private array $hero = [
        'atk' => 120,
        'critical' => 25,
        'def' => 25,
        'heath' => 1000,
        'dodge' => 20,
        'spd' => 100,
        'element' => null
    ];
    /**
     * @var array
     */
    private array $pairHeroes = [];
    /**
     * @var array
     */
    private array $histories = [];
    /**
     * @var int
     */
    private int $turn = 0;

    /**
     * @param string $str
     */
    public function bet(string $str)
    {

    }

    public function fight()
    {
        $this->createBattle();
        $baseHero = $this->pairHeroes;

        while ($this->turn < 20) {
            $this->turn++;
            $res = $this->war();
            if ($res) break;
        }

       return [
           'baseHero' => $baseHero,
           'histories' => $this->histories,
           'pairHeroes' => $this->pairHeroes
       ];
    }

    /**
     * @return bool
     */
    private function war(): bool
    {
        //sort hero
        $this->sortPair();

        $defHero = array_shift($this->pairHeroes);
        $atkHero = array_pop($this->pairHeroes);

        //atk
        $result = $this->getChangedWar($atkHero, $defHero);
        $destroy = $result['destroy'];;
        $heath = $defHero['heath'] -= $destroy;

        $this->pairHeroes = [$atkHero, $defHero];

        if ($heath <= 0) return true;

        //atk
        $result = $this->getChangedWar($defHero, $atkHero);
        $destroy = $result['destroy'];;
        $heath = $atkHero['heath'] -= $destroy;

        $this->pairHeroes = [$atkHero, $defHero];

        if ($heath <= 0) return true;

        return false;
    }

    public function createBattle()
    {
        foreach (['dark', 'light'] as $element) {
            $this->pairHeroes[] = $this->createNewHero($element);
        }
        $this->sortPair();
    }

    private function sortPair()
    {
        while ($this->pairHeroes[0]['spd'] === $this->pairHeroes[1]['spd']) {
            $index = rand(0, 1);
            if ($index) {
                $rand = rand(90, 110);
                $this->pairHeroes[$index]['spd'] = ((int) $this->pairHeroes[$index]['spd'] * $rand / 100);
            }
        }

        $this->pairHeroes = array_values(Arr::sort($this->pairHeroes, function ($value) {
            return $value['spd'];
        }));
    }

    /**
     * @param $element
     * @return array
     */
    private function createNewHero($element): array
    {
        $hero = [];
        foreach ($this->hero as $attr => $value) {
            $rand = rand(90, 110);
            $hero[$attr] = (int) ($value * $rand / 100);
        }
        $hero['element'] = $element;
        return $hero;
    }

    /**
     * @param $heroAtk
     * @param $heroDef
     * @return float|int|mixed
     */
    public function getChangedWar($heroAtk, $heroDef)
    {
        $data = [
            'turn' => 0,
            'heath' => 0,
            'dame' => 0,
            'destroy' => 0,
            'is_critical' => 0,
            'is_dodge' => 0,
            'atk_by' => null
        ];
        $data['turn'] = $this->turn;
        $data['atk_by'] = $heroAtk['element'];

        $atk = $heroAtk['atk'];
        $critical = $heroAtk['critical'];
        $def = $heroDef['def'];
        $dodge = $heroDef['dodge'];

        $rand = rand(1, 100);

        if ($rand > $critical) {
            $data['dame'] = $atk - $def;
            $data['destroy'] = $atk - $def;
        } else {
            $data['is_critical'] = 1;
            $data['dame'] = $atk * 2.5 - $def;
            $data['destroy'] = $atk * 2.5 - $def;
        }

        $rand = rand(1, 100);

        if ($rand <= $dodge) {
            $data['is_dodge'] = 1;
            $data['destroy'] = 0;
        }
        $data['heath'] = $heroDef['heath'] -= $data['destroy'];
        $this->histories[] = $data;
        return $data;
    }
}
