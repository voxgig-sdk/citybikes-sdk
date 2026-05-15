# Citybikes SDK feature factory

from feature.base_feature import CitybikesBaseFeature
from feature.test_feature import CitybikesTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CitybikesBaseFeature(),
        "test": lambda: CitybikesTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
