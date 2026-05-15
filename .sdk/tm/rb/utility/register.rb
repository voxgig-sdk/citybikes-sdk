# Citybikes SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CitybikesUtility.registrar = ->(u) {
  u.clean = CitybikesUtilities::Clean
  u.done = CitybikesUtilities::Done
  u.make_error = CitybikesUtilities::MakeError
  u.feature_add = CitybikesUtilities::FeatureAdd
  u.feature_hook = CitybikesUtilities::FeatureHook
  u.feature_init = CitybikesUtilities::FeatureInit
  u.fetcher = CitybikesUtilities::Fetcher
  u.make_fetch_def = CitybikesUtilities::MakeFetchDef
  u.make_context = CitybikesUtilities::MakeContext
  u.make_options = CitybikesUtilities::MakeOptions
  u.make_request = CitybikesUtilities::MakeRequest
  u.make_response = CitybikesUtilities::MakeResponse
  u.make_result = CitybikesUtilities::MakeResult
  u.make_point = CitybikesUtilities::MakePoint
  u.make_spec = CitybikesUtilities::MakeSpec
  u.make_url = CitybikesUtilities::MakeUrl
  u.param = CitybikesUtilities::Param
  u.prepare_auth = CitybikesUtilities::PrepareAuth
  u.prepare_body = CitybikesUtilities::PrepareBody
  u.prepare_headers = CitybikesUtilities::PrepareHeaders
  u.prepare_method = CitybikesUtilities::PrepareMethod
  u.prepare_params = CitybikesUtilities::PrepareParams
  u.prepare_path = CitybikesUtilities::PreparePath
  u.prepare_query = CitybikesUtilities::PrepareQuery
  u.result_basic = CitybikesUtilities::ResultBasic
  u.result_body = CitybikesUtilities::ResultBody
  u.result_headers = CitybikesUtilities::ResultHeaders
  u.transform_request = CitybikesUtilities::TransformRequest
  u.transform_response = CitybikesUtilities::TransformResponse
}
