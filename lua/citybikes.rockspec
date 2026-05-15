package = "voxgig-sdk-citybikes"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/citybikes-sdk.git"
}
description = {
  summary = "Citybikes SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["citybikes_sdk"] = "citybikes_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
