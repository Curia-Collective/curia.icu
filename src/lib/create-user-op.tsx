'use server'

import { CURIA_ADDRESS } from '@/lib/contracts'

export const createUserOp = async (args: string) => {
  const { op, signature, signer } = JSON.parse(args)
  const body = JSON.stringify({
    account: CURIA_ADDRESS,
    op,
    signature,
    signer,
  })
  const res = await fetch(`${process.env.NEXT_PUBLIC_NANI_URL}/api/userOp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error)
  }

  return data
}
