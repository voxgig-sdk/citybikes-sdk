// Typed models for the Citybikes SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Network {
  company?: any
  href?: string
  id?: string
  location?: Record<string, any>
  name?: string
  network?: Record<string, any>
}

export interface NetworkLoadMatch {
  id: string
}

export type NetworkListMatch = Partial<Network>

