'use server'

import { env } from '@/env.mjs'
import pinataSDK from '@pinata/sdk'
import { v4 as uuid } from 'uuid'
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

export const pinFileToIPFS = async (url: string) => {
  try {
    const formData = new FormData()

    const imageResponse = await fetch(url)
    const blob = await imageResponse.blob()
    formData.append('file', blob, `filing-${uuid()}`)

    const pinataMetadata = JSON.stringify({
      name: `filing-${uuid()}`,
    })
    formData.append('pinataMetadata', pinataMetadata)

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions)

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.PINATA_JWT}`,
      },
      body: formData,
    })

    const resData = await res.json()
    return formatIpfsUrl(resData.IpfsHash)
  } catch (error) {
    console.error(error)
    throw error
  }
}

const formatIpfsUrl = (hash: string) => `ipfs://${hash}`
