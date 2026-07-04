-- Typed models for the Citybikes SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Network
---@field company? any
---@field href? string
---@field id? string
---@field location? table
---@field name? string
---@field network? table

---@class NetworkLoadMatch
---@field id string

---@class NetworkListMatch

local M = {}

return M
