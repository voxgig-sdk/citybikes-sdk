<?php
declare(strict_types=1);

// Citybikes SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CitybikesFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CitybikesBaseFeature();
            case "test":
                return new CitybikesTestFeature();
            default:
                return new CitybikesBaseFeature();
        }
    }
}
