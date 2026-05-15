<?php
declare(strict_types=1);

// Citybikes SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

CitybikesUtility::setRegistrar(function (CitybikesUtility $u): void {
    $u->clean = [CitybikesClean::class, 'call'];
    $u->done = [CitybikesDone::class, 'call'];
    $u->make_error = [CitybikesMakeError::class, 'call'];
    $u->feature_add = [CitybikesFeatureAdd::class, 'call'];
    $u->feature_hook = [CitybikesFeatureHook::class, 'call'];
    $u->feature_init = [CitybikesFeatureInit::class, 'call'];
    $u->fetcher = [CitybikesFetcher::class, 'call'];
    $u->make_fetch_def = [CitybikesMakeFetchDef::class, 'call'];
    $u->make_context = [CitybikesMakeContext::class, 'call'];
    $u->make_options = [CitybikesMakeOptions::class, 'call'];
    $u->make_request = [CitybikesMakeRequest::class, 'call'];
    $u->make_response = [CitybikesMakeResponse::class, 'call'];
    $u->make_result = [CitybikesMakeResult::class, 'call'];
    $u->make_point = [CitybikesMakePoint::class, 'call'];
    $u->make_spec = [CitybikesMakeSpec::class, 'call'];
    $u->make_url = [CitybikesMakeUrl::class, 'call'];
    $u->param = [CitybikesParam::class, 'call'];
    $u->prepare_auth = [CitybikesPrepareAuth::class, 'call'];
    $u->prepare_body = [CitybikesPrepareBody::class, 'call'];
    $u->prepare_headers = [CitybikesPrepareHeaders::class, 'call'];
    $u->prepare_method = [CitybikesPrepareMethod::class, 'call'];
    $u->prepare_params = [CitybikesPrepareParams::class, 'call'];
    $u->prepare_path = [CitybikesPreparePath::class, 'call'];
    $u->prepare_query = [CitybikesPrepareQuery::class, 'call'];
    $u->result_basic = [CitybikesResultBasic::class, 'call'];
    $u->result_body = [CitybikesResultBody::class, 'call'];
    $u->result_headers = [CitybikesResultHeaders::class, 'call'];
    $u->transform_request = [CitybikesTransformRequest::class, 'call'];
    $u->transform_response = [CitybikesTransformResponse::class, 'call'];
});
