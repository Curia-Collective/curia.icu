'use server'

import {
  createConfig,
  getEnsAddress as getEnsAddressWagmi,
  http,
} from '@wagmi/core'
import { mainnet } from '@wagmi/core/chains'
import { normalize } from 'viem/ens'

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

export const getEnsAddress = async (name: string) => {
  return await getEnsAddressWagmi(config, {
    name: normalize(name),
  })
}
