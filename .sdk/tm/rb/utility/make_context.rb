# Citybikes SDK utility: make_context
require_relative '../core/context'
module CitybikesUtilities
  MakeContext = ->(ctxmap, basectx) {
    CitybikesContext.new(ctxmap, basectx)
  }
end
