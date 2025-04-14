const permitedKeys =Object.freeze(["shrek","cyanide","minions"] as const)
type permitedKeysT = (typeof permitedKeys)[number]
export interface lsDataType {
    order: number[], 
    open: boolean[],
    id: string[],
    chosen: string
    theme: permitedKeysT,
}

export function isPermitedKey(a:unknown): a is permitedKeysT{
    if(typeof a==="string" && (permitedKeys as readonly string[]).includes(a)){
        return true
    }
    return false
}

export type lsKeyType = "my"|"time"

export type lsTimeDataType = {
    timerId: null|number;
    time:number;
}