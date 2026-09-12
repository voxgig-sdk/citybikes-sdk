import { Context } from './Context';
declare class CitybikesError extends Error {
    isCitybikesError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CitybikesError };
