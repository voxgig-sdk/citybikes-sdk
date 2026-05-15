# Citybikes SDK configuration

module CitybikesConfig
  def self.make_config
    {
      "main" => {
        "name" => "Citybikes",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "http://api.citybik.es/v2",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "network" => {},
        },
      },
      "entity" => {
        "network" => {
          "fields" => [
            {
              "name" => "company",
              "req" => false,
              "type" => "`$ANY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "href",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "id",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "location",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "network",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 5,
            },
          ],
          "name" => "network",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "id,name,href",
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/networks",
                  "parts" => [
                    "networks",
                  ],
                  "select" => {
                    "exist" => [
                      "field",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "divvy",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "network_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                    "query" => [
                      {
                        "example" => "stations",
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/networks/{network_id}",
                  "parts" => [
                    "networks",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "network_id" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "field",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    CitybikesFeatures.make_feature(name)
  end
end
