# frozen_string_literal: true

# Typed models for the Citybikes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Network entity data model.
#
# @!attribute [rw] company
#   @return [Object, nil]
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] stations
#   @return [Array, nil]
Network = Struct.new(
  :company,
  :href,
  :id,
  :location,
  :name,
  :stations,
  keyword_init: true
)

# Request payload for Network#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] field
#   @return [String, nil]
NetworkLoadMatch = Struct.new(
  :id,
  :field,
  keyword_init: true
)

# Request payload for Network#list.
#
# @!attribute [rw] field
#   @return [String, nil]
NetworkListMatch = Struct.new(
  :field,
  keyword_init: true
)

