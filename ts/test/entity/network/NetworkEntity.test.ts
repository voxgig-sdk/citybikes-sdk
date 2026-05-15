
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { CitybikesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('NetworkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CITYBIKES_TEST_LIVE=TRUE.
  afterEach(liveDelay('CITYBIKES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CitybikesSDK.test()
    const ent = testsdk.Network()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CITYBIKES_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'network.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set CITYBIKES_TEST_NETWORK_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let network_ref01_data = Object.values(setup.data.existing.network)[0] as any

    // LIST
    const network_ref01_ent = client.Network()
    const network_ref01_match: any = {}

    const network_ref01_list = await network_ref01_ent.list(network_ref01_match)


    // LOAD
    const network_ref01_match_dt0: any = {}
    network_ref01_match_dt0.id = network_ref01_data.id
    const network_ref01_data_dt0 = await network_ref01_ent.load(network_ref01_match_dt0)
    assert(network_ref01_data_dt0.id === network_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/network/NetworkTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CitybikesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['network01','network02','network03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['CITYBIKES_TEST_NETWORK_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'CITYBIKES_TEST_NETWORK_ENTID': idmap,
    'CITYBIKES_TEST_LIVE': 'FALSE',
    'CITYBIKES_TEST_EXPLAIN': 'FALSE',
    'CITYBIKES_APIKEY': 'NONE',
  })

  idmap = env['CITYBIKES_TEST_NETWORK_ENTID']

  const live = 'TRUE' === env.CITYBIKES_TEST_LIVE

  if (live) {
    client = new CitybikesSDK(merge([
      {
        apikey: env.CITYBIKES_APIKEY,
      },
      extra
    ]))
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
