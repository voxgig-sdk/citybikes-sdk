# Citybikes SDK feature factory

from citybikes_sdk.feature.base_feature import CitybikesBaseFeature
from citybikes_sdk.feature.ratelimit_feature import CitybikesRatelimitFeature
from citybikes_sdk.feature.retry_feature import CitybikesRetryFeature
from citybikes_sdk.feature.test_feature import CitybikesTestFeature
from citybikes_sdk.feature.timeout_feature import CitybikesTimeoutFeature


_FEATURES = {
    "base": lambda: CitybikesBaseFeature(),
    "ratelimit": lambda: CitybikesRatelimitFeature(),
    "retry": lambda: CitybikesRetryFeature(),
    "test": lambda: CitybikesTestFeature(),
    "timeout": lambda: CitybikesTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
