import { CitybikesEntityBase } from '../CitybikesEntityBase';
import type { CitybikesSDK } from '../CitybikesSDK';
import type { Control } from '../types';
import type { Network, NetworkLoadMatch, NetworkListMatch } from '../CitybikesTypes';
declare class NetworkEntity extends CitybikesEntityBase<Network> {
    constructor(client: CitybikesSDK, entopts: any);
    make(this: NetworkEntity): NetworkEntity;
    load(this: any, reqmatch?: NetworkLoadMatch, ctrl?: Control): Promise<NetworkEntity>;
    list(this: any, reqmatch?: NetworkListMatch, ctrl?: Control): Promise<NetworkEntity[]>;
}
export { NetworkEntity };
