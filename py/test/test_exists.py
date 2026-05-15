# ProjectName SDK exists test

import pytest
from citybikes_sdk import CitybikesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CitybikesSDK.test(None, None)
        assert testsdk is not None
