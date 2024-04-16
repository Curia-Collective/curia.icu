'use server'

import { normalize } from 'viem/ens'

import { getPublicClient } from './publicClient'

export const getEnsAddress = async (name: string) => {
  const normalized = normalize(name)
  return await getPublicClient(1).getEnsAddress({ name: normalized })
}
