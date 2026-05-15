<?php
declare(strict_types=1);

// Citybikes SDK exists test

require_once __DIR__ . '/../citybikes_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CitybikesSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
