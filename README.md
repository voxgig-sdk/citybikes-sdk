# Citybikes SDK

Discover bike-sharing networks and real-time station availability for cities worldwide

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About CityBikes API

[CityBikes](http://api.citybik.es/v2/) is a long-running community project that aggregates real-time data from bike-sharing networks around the world into a single JSON API. The project is powered by the open-source [PyBikes](https://github.com/eskerda/pybikes) scraper library.

What you get from the API:

- A list of every tracked bike-sharing network with its `id`, `name`, `company`, and location (`latitude`, `longitude`, `city`, `country`).
- Per-network detail including a `stations` array with each station's coordinates, last-update `timestamp`, and live `free_bikes` / `empty_slots` counts.
- A `vehicles` array for free-floating systems, with location and a type classifier of `bike`, `ebike`, or `scooter`.
- Extra metadata where the operator provides it: payment methods, e-bike availability, rental URIs, and online status.

Responses are JSON only. You can trim payloads with the `?fields=id,name,href` query parameter, which selects fields from the top-level document. CORS is enabled, and no authentication is required.

## Try it

**TypeScript**
```bash
npm install citybikes
```

**Python**
```bash
pip install citybikes-sdk
```

**PHP**
```bash
composer require voxgig/citybikes-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/citybikes-sdk/go
```

**Ruby**
```bash
gem install citybikes-sdk
```

**Lua**
```bash
luarocks install citybikes-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { CitybikesSDK } from 'citybikes'

const client = new CitybikesSDK({})

// List all networks
const networks = await client.Network().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o citybikes-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "citybikes": {
      "command": "/abs/path/to/citybikes-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Network** | A bike-sharing system in a given city, exposed at `/v2/networks` (list) and `/v2/networks/{network_id}` (detail with stations and free-floating vehicles). | `/networks` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from citybikes_sdk import CitybikesSDK

client = CitybikesSDK({})

# List all networks
networks, err = client.Network(None).list(None, None)

# Load a specific network
network, err = client.Network(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'citybikes_sdk.php';

$client = new CitybikesSDK([]);

// List all networks
[$networks, $err] = $client->Network(null)->list(null, null);

// Load a specific network
[$network, $err] = $client->Network(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/citybikes-sdk/go"

client := sdk.NewCitybikesSDK(map[string]any{})

// List all networks
networks, err := client.Network(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Citybikes_sdk"

client = CitybikesSDK.new({})

# List all networks
networks, err = client.Network(nil).list(nil, nil)

# Load a specific network
network, err = client.Network(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("citybikes_sdk")

local client = sdk.new({})

-- List all networks
local networks, err = client:Network(nil):list(nil, nil)

-- Load a specific network
local network, err = client:Network(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = CitybikesSDK.test()
const result = await client.Network().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = CitybikesSDK.test(None, None)
result, err = client.Network(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = CitybikesSDK::test(null, null);
[$result, $err] = $client->Network(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Network(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = CitybikesSDK.test(nil, nil)
result, err = client.Network(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Network(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the CityBikes API

- Upstream: [http://api.citybik.es/v2/](http://api.citybik.es/v2/)

- Free to access without an API key.
- Attribution is required: include a noticeable statement on your app or website linking back to the CityBikes project.
- Projects built on PyBikes should additionally credit that library.
- The maintainers describe the data as "not exactly open data" — attribution is what keeps the service sustainable.

---

Generated from the CityBikes API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
