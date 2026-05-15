<?php
declare(strict_types=1);

// Citybikes SDK configuration

class CitybikesConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Citybikes",
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
                "auth" => [
                    "prefix" => "Bearer",
                ],
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
              'req' => false,
              'type' => '`$ANY`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'href',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'id',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'location',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'network',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 5,
            ],
          ],
          'name' => 'network',
          'op' => [
            'list' => [
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
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
            'load' => [
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
                        'active' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'stations',
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
