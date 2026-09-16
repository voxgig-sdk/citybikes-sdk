"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('NetworkEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CITYBIKES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CITYBIKES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CitybikesSDK.test();
        const ent = testsdk.Network();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CITYBIKES_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'network.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "company", "req": false, "short": "Company or companies operating the network", "type": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "index$": 0 }, { "active": true, "name": "href", "req": false, "short": "API endpoint for this network", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the network", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "location", "req": false, "short": "Geographic location information", "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "name", "req": false, "short": "Display name of the network", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "stations", "req": false, "short": "List of all stations in this network", "type": "`$ARRAY`", "index$": 5 }], "id": { "field": "id", "name": "id" }, "name": "network", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "id,name,href", "kind": "query", "name": "field", "orig": "field", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /networks", "json": "{\"operationId\":\"getNetworks\",\"parameters\":[{\"description\":\"Comma-separated list of fields to include in the response (e.g., id,name,href)\",\"example\":\"id,name,href\",\"in\":\"query\",\"name\":\"fields\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"filtered\":{\"summary\":\"Filtered fields (id, name, href)\",\"value\":{\"networks\":[{\"href\":\"/v2/networks/velib\",\"id\":\"velib\",\"name\":\"Vélib'\"}]}},\"full\":{\"summary\":\"Full network information\",\"value\":{\"networks\":[{\"company\":\"JCDecaux\",\"href\":\"/v2/networks/velib\",\"id\":\"velib\",\"location\":{\"city\":\"Paris\",\"country\":\"FRA\",\"latitude\":48.856612,\"longitude\":2.352233},\"name\":\"Vélib'\"}]}}},\"schema\":{\"properties\":{\"networks\":{\"items\":{\"description\":\"Basic network information\",\"properties\":{\"company\":{\"description\":\"Company or companies operating the network\",\"example\":\"JCDecaux\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"href\":{\"description\":\"API endpoint for detailed network information\",\"example\":\"/v2/networks/velib\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the network\",\"example\":\"velib\",\"type\":\"string\"},\"location\":{\"description\":\"Geographic location information\",\"properties\":{\"city\":{\"description\":\"City name\",\"example\":\"Paris\",\"type\":\"string\"},\"country\":{\"description\":\"Country code (ISO 3166-1 alpha-3 or alpha-2)\",\"example\":\"FRA\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":48.856612,\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":2.352233,\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"name\":{\"description\":\"Display name of the network\",\"example\":\"Vélib'\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of networks\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/networks", "segments": [{ "lit": "networks" }], "select": { "exist": ["field"] }, "transform": { "req": "`reqdata`", "res": "`body.networks`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "divvy", "kind": "param", "name": "id", "orig": "network_id", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": "stations", "kind": "query", "name": "field", "orig": "field", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /networks/{network_id}", "json": "{\"operationId\":\"getNetworkById\",\"parameters\":[{\"description\":\"Unique identifier of the network\",\"example\":\"divvy\",\"in\":\"path\",\"name\":\"network_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated list of fields to include in the response. Use 'stations' to get only station data.\",\"example\":\"stations\",\"in\":\"query\",\"name\":\"fields\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"full\":{\"summary\":\"Full network details with stations\",\"value\":{\"network\":{\"company\":[\"Motivate International, Inc.\",\"PBSC Urban Solutions\"],\"href\":\"/v2/networks/divvy\",\"id\":\"divvy\",\"location\":{\"city\":\"Chicago, IL\",\"country\":\"US\",\"latitude\":41.8781136,\"longitude\":-87.6297982},\"name\":\"Divvy\",\"stations\":[{\"empty_slots\":1,\"extra\":{\"online\":true,\"uid\":\"95a7c0eccf0eff27a6e9c603d93e0bdc\"},\"free_bikes\":13,\"id\":\"000db9b6e3849926d4868caf7096780d\",\"kind\":\"ebike\",\"latitude\":41.85418424947,\"longitude\":-87.6191537415,\"name\":\"Calumet Ave & 21st St\",\"timestamp\":\"2025-04-17T16:41:02.505032+00:00\"}]}}}},\"schema\":{\"properties\":{\"network\":{\"description\":\"Detailed network information including stations\",\"properties\":{\"company\":{\"description\":\"Company or companies operating the network\",\"oneOf\":[{\"type\":\"string\"},{\"items\":{\"type\":\"string\"},\"type\":\"array\"}]},\"href\":{\"description\":\"API endpoint for this network\",\"example\":\"/v2/networks/divvy\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the network\",\"example\":\"divvy\",\"type\":\"string\"},\"location\":{\"description\":\"Geographic location information\",\"properties\":{\"city\":{\"description\":\"City name\",\"example\":\"Paris\",\"type\":\"string\"},\"country\":{\"description\":\"Country code (ISO 3166-1 alpha-3 or alpha-2)\",\"example\":\"FRA\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":48.856612,\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":2.352233,\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"name\":{\"description\":\"Display name of the network\",\"example\":\"Divvy\",\"type\":\"string\"},\"stations\":{\"description\":\"List of all stations in this network\",\"items\":{\"description\":\"Individual bike station information\",\"properties\":{\"empty_slots\":{\"description\":\"Number of empty docking slots\",\"example\":1,\"type\":\"integer\"},\"extra\":{\"additionalProperties\":true,\"description\":\"Additional station-specific information\",\"properties\":{\"online\":{\"description\":\"Whether the station is online\",\"type\":\"boolean\"},\"uid\":{\"description\":\"Alternative unique identifier\",\"type\":\"string\"}},\"type\":\"object\"},\"free_bikes\":{\"description\":\"Number of available bikes\",\"example\":13,\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the station\",\"example\":\"000db9b6e3849926d4868caf7096780d\",\"type\":\"string\"},\"kind\":{\"description\":\"Type of bikes available\",\"example\":\"ebike\",\"type\":\"string\"},\"latitude\":{\"description\":\"Station latitude coordinate\",\"example\":41.85418424947,\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Station longitude coordinate\",\"example\":-87.6191537415,\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Station name or address\",\"example\":\"Calumet Ave & 21st St\",\"type\":\"string\"},\"timestamp\":{\"description\":\"UTC timestamp of last update\",\"example\":\"2025-04-17T16:41:02.505032+00:00\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with network details\"},\"404\":{\"description\":\"Network not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/networks/{network_id}", "rename": { "param": { "network_id": "id" } }, "segments": [{ "lit": "networks" }, { "var": "id" }], "select": { "exist": ["field", "id"] }, "transform": { "req": "`reqdata`", "res": "`body.network`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "network", "name__orig": "network", "Name": "Network", "name_": "network", "name-": "network", "NAME": "NETWORK", "index$": 0 }, { "active": true, "entity": "network", "key$": "BasicNetworkFlow", "kind": "basic", "name": "BasicNetworkFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "network_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "network_ref01", "srcdatavar": "network_ref01_data", "suffix": "_dt0" }, "match": { "id": "network01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-network_ref01" } }], "index$": 1 }] }, 'Network');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let network_ref01_data = Object.values(setup.data.existing.network)[0];
        // LIST
        const network_ref01_ent = client.Network();
        const network_ref01_match = {};
        const network_ref01_list = (await network_ref01_ent.list(network_ref01_match)).map((e) => e.data());
        // LOAD
        const network_ref01_match_dt0 = {};
        network_ref01_match_dt0.id = network_ref01_data.id;
        const network_ref01_data_dt0 = (await network_ref01_ent.load(network_ref01_match_dt0)).data();
        (0, node_assert_1.default)(network_ref01_data_dt0.id === network_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/network/NetworkTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CitybikesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['network01', 'network02', 'network03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CITYBIKES_TEST_NETWORK_ENTID': idmap,
        'CITYBIKES_TEST_LIVE': 'FALSE',
        'CITYBIKES_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CITYBIKES_TEST_NETWORK_ENTID'];
    const live = 'TRUE' === env.CITYBIKES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CITYBIKES_TEST_NETWORK_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CitybikesSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CITYBIKES_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=NetworkEntity.test.js.map