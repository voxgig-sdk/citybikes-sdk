# Network entity test

require "minitest/autorun"
require "json"
require_relative "../Citybikes_sdk"
require_relative "runner"

class NetworkEntityTest < Minitest::Test
  def test_create_instance
    testsdk = CitybikesSDK.test(nil, nil)
    ent = testsdk.Network(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = network_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "network." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set CITYBIKES_TEST_NETWORK_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    network_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.network")))
    network_ref01_data = nil
    if network_ref01_data_raw.length > 0
      network_ref01_data = Helpers.to_map(network_ref01_data_raw[0][1])
    end

    # LIST
    network_ref01_ent = client.Network(nil)
    network_ref01_match = {}

    network_ref01_list_result, err = network_ref01_ent.list(network_ref01_match, nil)
    assert_nil err
    assert network_ref01_list_result.is_a?(Array)

    # LOAD
    network_ref01_match_dt0 = {
      "id" => network_ref01_data["id"],
    }
    network_ref01_data_dt0_loaded, err = network_ref01_ent.load(network_ref01_match_dt0, nil)
    assert_nil err
    network_ref01_data_dt0_load_result = Helpers.to_map(network_ref01_data_dt0_loaded)
    assert !network_ref01_data_dt0_load_result.nil?
    assert_equal network_ref01_data_dt0_load_result["id"], network_ref01_data["id"]

  end
end

def network_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "network", "NetworkTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CitybikesSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["network01", "network02", "network03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["CITYBIKES_TEST_NETWORK_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CITYBIKES_TEST_NETWORK_ENTID" => idmap,
    "CITYBIKES_TEST_LIVE" => "FALSE",
    "CITYBIKES_TEST_EXPLAIN" => "FALSE",
    "CITYBIKES_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["CITYBIKES_TEST_NETWORK_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["CITYBIKES_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["CITYBIKES_APIKEY"],
      },
      extra || {},
    ])
    client = CitybikesSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["CITYBIKES_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["CITYBIKES_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
