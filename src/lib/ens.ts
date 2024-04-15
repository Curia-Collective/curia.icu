'use server'
import { Address } from "viem"
import { normalize } from 'viem/ens'
import { getPublicClient } from "./publicClient"

export const getEnsAddress = async (name: string) => {
    const normalized = normalize(name)
    return await getPublicClient(1).getEnsAddress({ name: normalized })
}

export const truncAddress = (address: Address) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
}