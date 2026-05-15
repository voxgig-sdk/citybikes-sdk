
import { Context } from './Context'


class CitybikesError extends Error {

  isCitybikesError = true

  sdk = 'Citybikes'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CitybikesError
}

