-- Citybikes SDK error

local CitybikesError = {}
CitybikesError.__index = CitybikesError


function CitybikesError.new(code, msg, ctx)
  local self = setmetatable({}, CitybikesError)
  self.is_sdk_error = true
  self.sdk = "Citybikes"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CitybikesError:error()
  return self.msg
end


function CitybikesError:__tostring()
  return self.msg
end


return CitybikesError
