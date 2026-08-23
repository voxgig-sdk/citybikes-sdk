<?php
declare(strict_types=1);

// Citybikes SDK configuration

class CitybikesConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Citybikes",
                "slug" => "citybikes",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "http://api.citybik.es/v2",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "network" => [],
                ],
            ],
            "entity" => [
        'network' => [
          'fields' => [
            [
              'name' => 'company',
              'short' => 'Company or companies operating the network',
              'type' => '`$ANY`',
              'union' => [
                'branches' => 2,
                'count' => 1,
                'depth' => 0,
              ],
            ],
            [
              'name' => 'href',
              'short' => 'API endpoint for this network',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the network',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'location',
              'short' => 'Geographic location information',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'name',
              'short' => 'Display name of the network',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'stations',
              'short' => 'List of all stations in this network',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'network',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'id,name,href',
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/networks',
                  'parts' => [
                    'networks',
                  ],
                  'select' => [
                    'exist' => [
                      'field',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.networks`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'divvy',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'network_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'stations',
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/networks/{network_id}',
                  'parts' => [
                    'networks',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'network_id' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'field',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.network`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CitybikesFeatures::make_feature($name);
    }
}
