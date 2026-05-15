<?php
declare(strict_types=1);

// Citybikes SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CitybikesMakeContext
{
    public static function call(array $ctxmap, ?CitybikesContext $basectx): CitybikesContext
    {
        return new CitybikesContext($ctxmap, $basectx);
    }
}
