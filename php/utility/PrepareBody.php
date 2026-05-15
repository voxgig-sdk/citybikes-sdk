<?php
declare(strict_types=1);

// Citybikes SDK utility: prepare_body

class CitybikesPrepareBody
{
    public static function call(CitybikesContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
