'use server'

import { env } from '@/env.mjs'
import pinataSDK from '@pinata/sdk'
import { keccak256, toHex } from 'viem'

const pinata = new pinataSDK({ pinataJWTKey: env.PINATA_JWT })

export const pinJsonToIpfs = async (json: any) => {
  const res = await pinata.pinJSONToIPFS(json, {
    pinataMetadata: {
      name: `filing-${keccak256(toHex(json.toString()))}`,
    },
  })

  return formatIpfsUrl(res.IpfsHash)
}

const formatIpfsUrl = (hash: string) => `ipfs://${hash}`
