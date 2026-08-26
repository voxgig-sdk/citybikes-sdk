
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Citybikes',
        slug: "citybikes",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "http://api.citybik.es/v2",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      network: {
      },

    }
  }


  entity = {
    "network": {
      "fields": [
        {
          "name": "company",
          "short": "Company or companies operating the network",
          "type": "`$ANY`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 0
          }
        },
        {
          "name": "href",
          "short": "API endpoint for this network",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the network",
          "type": "`$STRING`"
        },
        {
          "name": "location",
          "short": "Geographic location information",
          "type": "`$OBJECT`"
        },
        {
          "name": "name",
          "short": "Display name of the network",
          "type": "`$STRING`"
        },
        {
          "name": "stations",
          "short": "List of all stations in this network",
          "type": "`$ARRAY`"
        }
      ],
      "name": "network",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "id,name,href",
                    "kind": "query",
                    "name": "field",
                    "orig": "field",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/networks",
              "parts": [
                "networks"
              ],
              "select": {
                "exist": [
                  "field"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.networks`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "divvy",
                    "kind": "param",
                    "name": "id",
                    "orig": "network_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "stations",
                    "kind": "query",
                    "name": "field",
                    "orig": "field",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/networks/{network_id}",
              "parts": [
                "networks",
                "{id}"
              ],
              "rename": {
                "param": {
                  "network_id": "id"
                }
              },
              "select": {
                "exist": [
                  "field",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.network`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

