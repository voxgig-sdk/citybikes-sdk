# Citybikes SDK utility: feature_add
module CitybikesUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
