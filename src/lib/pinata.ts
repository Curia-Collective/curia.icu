'use server'

import { env } from '@/env.mjs'
import pinataSDK from '@pinata/sdk'

export const pinata = new pinataSDK({ pinataJWTKey: env.PINATA_JWT })
