'use client'
import { Address, getAddress } from 'viem'
import { useEnsName } from 'wagmi'

import { truncAddress } from '@/lib/ens'

export const PrettyAccount  = ({ address }: { address: string }) => {
  const { data } = useEnsName({
    address: address as Address,
    chainId: 1,
  })

  if (data) {
    return <span>{data}</span>
  }

  return <span>{truncAddress(getAddress(address))}</span>
}
