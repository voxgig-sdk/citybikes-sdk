# Citybikes SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CitybikesFeatures
  def self.make_feature(name)
    case name
    when "base"
      CitybikesBaseFeature.new
    when "ratelimit"
      CitybikesRatelimitFeature.new
    when "retry"
      CitybikesRetryFeature.new
    when "test"
      CitybikesTestFeature.new
    when "timeout"
      CitybikesTimeoutFeature.new
    else
      CitybikesBaseFeature.new
    end
  end
end
