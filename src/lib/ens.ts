import { Address, zeroAddress } from "viem"

// @TODO
export const getEnsAddress = (name: string) => {
    return zeroAddress;
}

export const truncAddress = (address: Address) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
}