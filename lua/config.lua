-- ProjectName SDK configuration

local function make_config()
  return {
    main = {
      name = "Citybikes",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "http://api.citybik.es/v2",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["network"] = {},
      },
    },
    entity = {
      ["network"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "company",
            ["req"] = false,
            ["type"] = "`$ANY`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "href",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "location",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "network",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 5,
          },
        },
        ["name"] = "network",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "id,name,href",
                      ["kind"] = "query",
                      ["name"] = "field",
                      ["orig"] = "field",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/networks",
                ["parts"] = {
                  "networks",
                },
                ["select"] = {
                  ["exist"] = {
                    "field",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["example"] = "divvy",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "network_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "stations",
                      ["kind"] = "query",
                      ["name"] = "field",
                      ["orig"] = "field",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/networks/{network_id}",
                ["parts"] = {
                  "networks",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["network_id"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "field",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.network`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
