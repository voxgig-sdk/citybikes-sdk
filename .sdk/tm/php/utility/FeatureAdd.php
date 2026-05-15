<?php
declare(strict_types=1);

// Citybikes SDK utility: feature_add

class CitybikesFeatureAdd
{
    public static function call(CitybikesContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
