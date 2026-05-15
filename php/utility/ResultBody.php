<?php
declare(strict_types=1);

// Citybikes SDK utility: result_body

class CitybikesResultBody
{
    public static function call(CitybikesContext $ctx): ?CitybikesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
