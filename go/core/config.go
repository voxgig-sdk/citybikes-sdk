package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Citybikes",
			"slug": "citybikes",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "http://api.citybik.es/v2",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"network": map[string]any{},
			},
		},
		"entity": map[string]any{
			"network": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "company",
						"short": "Company or companies operating the network",
						"type": "`$ANY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 0,
						},
					},
					map[string]any{
						"name": "href",
						"short": "API endpoint for this network",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the network",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"short": "Geographic location information",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"short": "Display name of the network",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stations",
						"short": "List of all stations in this network",
						"type": "`$ARRAY`",
					},
				},
				"name": "network",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "id,name,href",
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/networks",
								"parts": []any{
									"networks",
								},
								"select": map[string]any{
									"exist": []any{
										"field",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.networks`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "divvy",
											"kind": "param",
											"name": "id",
											"orig": "network_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "stations",
											"kind": "query",
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/networks/{network_id}",
								"parts": []any{
									"networks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"network_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.network`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
