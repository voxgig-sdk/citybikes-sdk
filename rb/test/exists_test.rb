# Citybikes SDK exists test

require "minitest/autorun"
require_relative "../Citybikes_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CitybikesSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
