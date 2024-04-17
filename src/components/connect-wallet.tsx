'use client'

import { useIsMounted } from '@/hooks/use-is-mounted'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const ConnectWallet = () => {
  const isMounted = useIsMounted()

  if (!isMounted) return null
  return <ConnectButton label="Log In" />
}
