<?php
declare(strict_types=1);

// Citybikes SDK utility: result_headers

class CitybikesResultHeaders
{
    public static function call(CitybikesContext $ctx): ?CitybikesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
