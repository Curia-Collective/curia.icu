import { env } from "@/env.mjs";
import { createPublicClient, http } from "viem";
import { arbitrum, mainnet } from "viem/chains";

export const publicClient = createPublicClient({
    chain: mainnet,
    transport: http('https://rpc.ankr.com/eth/' + env.NEXT_PUBLIC_ANKR_API_KEY),
});

const getChainById = (chainId: number) => {
  switch (chainId) {
    case 1:
      return {
        chain: mainnet,
        shortName: 'eth'
      }
    case arbitrum.id:
      return {
        chain: arbitrum,
        shortName: 'arbitrum'
      }
    default:
      throw new Error('Unsupported chain ID')
  }
}
 
export const getPublicClient = (chainId: number) => {
    const chain = getChainById(chainId)
    return createPublicClient({
        chain: chain.chain,
        transport: http(`https://rpc.ankr.com/${chain.shortName}/${env.NEXT_PUBLIC_ANKR_API_KEY}`),
    })
}