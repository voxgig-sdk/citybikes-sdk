# Typed models for the Citybikes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Network:
    company: Optional[Any] = None
    href: Optional[str] = None
    id: Optional[str] = None
    location: Optional[dict] = None
    name: Optional[str] = None
    network: Optional[dict] = None


@dataclass
class NetworkLoadMatch:
    id: str


@dataclass
class NetworkListMatch:
    company: Optional[Any] = None
    href: Optional[str] = None
    id: Optional[str] = None
    location: Optional[dict] = None
    name: Optional[str] = None
    network: Optional[dict] = None

