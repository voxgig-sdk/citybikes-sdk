# Citybikes SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CitybikesFeatures
  def self.make_feature(name)
    case name
    when "base"
      CitybikesBaseFeature.new
    when "test"
      CitybikesTestFeature.new
    else
      CitybikesBaseFeature.new
    end
  end
end
