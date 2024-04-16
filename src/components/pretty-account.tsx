'use client'

import React from 'react'
import { Address, getAddress } from 'viem'
import { useEnsName } from 'wagmi'

import { truncAddress } from '@/lib/address'

const PrettyAccountComponent = ({ address }: { address: string }) => {
  const { data } = useEnsName({
    address: address as Address,
    chainId: 1,
  })

  if (data) {
    return <span>{data}</span>
  }

  return <span>{truncAddress(getAddress(address))}</span>
}

export const PrettyAccount = React.memo(PrettyAccountComponent)
PrettyAccount.displayName = 'PrettyAccount'
