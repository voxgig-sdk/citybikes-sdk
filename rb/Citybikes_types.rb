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
# @!attribute [rw] network
#   @return [Hash, nil]
Network = Struct.new(
  :company,
  :href,
  :id,
  :location,
  :name,
  :network,
  keyword_init: true
)

# Request payload for Network#load.
#
# @!attribute [rw] id
#   @return [String]
NetworkLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Match filter for Network#list (any subset of Network fields).
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
# @!attribute [rw] network
#   @return [Hash, nil]
NetworkListMatch = Struct.new(
  :company,
  :href,
  :id,
  :location,
  :name,
  :network,
  keyword_init: true
)

