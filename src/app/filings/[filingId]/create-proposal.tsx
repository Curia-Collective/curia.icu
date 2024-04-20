'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { SelectFilings } from '@/db/schema'
import { env } from '@/env.mjs'
import { toast } from 'sonner'
import { Address, Hex, encodeFunctionData, zeroAddress } from 'viem'
import { useAccount, useReadContract, useSignTypedData } from 'wagmi'

import { accountAbi } from '@/lib/abis/account'
import { dagonAbi } from '@/lib/abis/dagon'
import { judgmentsAbi } from '@/lib/abis/judgments'
import {
  CURIA_ADDRESS,
  DAGON_ADDRESS,
  JUDGMENTS_ADDRESS,
} from '@/lib/contracts'
import { createUserOp } from '@/lib/create-user-op'
import { pinJsonToIpfs } from '@/lib/pinata'
import { DEFAULT_NETWORK } from '@/lib/siteConfig'
import { toUnixTimestamp } from '@/lib/time'
import { useJudgments } from '@/hooks/use-judgments'

// import { toUnixTimestamp } from '@/lib/time'
// import { pinJsonToIpfs } from '@/lib/pinata'
// import { encodeExecuteBatch } from '@/lib/wallet/utils'
// import { Address, Hex, encodeFunctionData, getAddress } from 'viem'
// import { JudgementsAbi } from '@/lib/abis/Judgements'
// import { getPublicClient } from '@/lib/wallet/publicClient'
// import { DEFAULT_NETWORK } from '@/lib/chains'
// import { ENTRYPOINT_ADDRESS_V06, getAccountNonce, getUserOperationHash } from 'permissionless'
// import { NEETH_ADDRESS } from '@/lib/addresses'
// import { DUMMY_SIGNATURE } from '@/hooks/wallet/use-send-op'
// import { createProposal } from '@/db/proposals'
// import { getPimlicoBundlerClient } from '@/lib/wallet/bundlerClient'

const createMints = (filing: SelectFilings, uri: string) => {
  let ops = [];

  if (filing.partyA !== zeroAddress) {
    ops.push({
      target: JUDGMENTS_ADDRESS,
      value: BigInt(0),
      data: encodeFunctionData({
        abi: judgmentsAbi,
        functionName: 'judge',
        args: [
          filing.partyA as Address,
          BigInt(filing.id),
          BigInt(1),
          '0x' as Hex,
          uri
        ]
      }),
    })
  } 

  if (filing.partyB !== zeroAddress) {
    ops.push({
      target: JUDGMENTS_ADDRESS,
      value: BigInt(0),
      data: encodeFunctionData({
        abi: judgmentsAbi,
        functionName: 'judge',
        args: [
          filing.partyB as Address,
          BigInt(filing.id),
          BigInt(1),
          '0x' as Hex,
          uri
        ]
      }),
    })
  }

  return ops;
}

export const CreateProposal = ({
  filing,
}: {
  filing: SelectFilings
}) => {
  const { data: judgments } = useJudgments(filing.id)
  const { address } = useAccount()
  const { data: balance } = useReadContract({
    address: DAGON_ADDRESS,
    abi: dagonAbi,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(CURIA_ADDRESS)] : undefined,
    chainId: DEFAULT_NETWORK.id,
  })
  const { signTypedDataAsync } = useSignTypedData()
  const [loading, setLoading] = useState(false)

  const createMintPropOnCuria = useCallback(async () => {
    try {
      setLoading(true)
      if (!judgments || judgments === null || judgments.length < 3) {
        throw new Error(
          'Not enough judgments to approve. Has everyone (including AI) judged yet?',
        )
      }

      if (!address) {
        throw new Error('You must be connected to create a proposal.')
      }

      //  create proposal
      const tokenUri = {
        name: filing.title,
        description: filing.description,
        image: filing.imageUrl,
        external_url: `https://www.curia.icu/filings/${filing.id}`,
        attributes: [
          {
            display_type: 'date',
            trait_type: 'Filing Date',
            value: toUnixTimestamp(new Date(filing.createdAt)),
          },
          {
            display_type: 'boost_percentage',
            trait_type: 'For Party A',
            value:
              (judgments.reduce((acc, judgment) => {
                return judgment.favours === 'A' ? acc + 1 : acc
              }, 0) /
                judgments.length) *
              100,
          },
          {
            display_type: 'boost_percentage',
            trait_type: 'For Party B',
            value:
              (judgments.reduce((acc, judgment) => {
                return judgment.favours === 'B' ? acc + 1 : acc
              }, 0) /
                judgments.length) *
              100,
          },
          ...judgments.map((judgment) => ({
            trait_type: `Judge ${
              judgment.judge === zeroAddress ? 'AI' : judgment.judge
            }`,
            value: `${judgment.reasoning}

                  In favour of ${judgment.favours}

                  Signature: ${judgment.signature}`,
          })),
        ],
      }

      const uri = await pinJsonToIpfs(tokenUri)

      const ops = createMints(filing, uri);

      const op = {
        target: CURIA_ADDRESS,
        value: BigInt(0),
        data: encodeFunctionData({
          abi: accountAbi,
          functionName: 'executeBatch',
          args: [ops],
        }),
      }

      const signature = await signTypedDataAsync({
        domain: {
          verifyingContract: CURIA_ADDRESS,
        },
        types: {
          Op: [
            { name: 'target', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'data', type: 'bytes' },
          ],
        },
        primaryType: 'Op',
        message: {
          target: op.target,
          value: op.value,
          data: op.data,
        },
      })

      const userOpHash = await createUserOp(
        JSON.stringify({
          op: {
            ...op,
            value: op.value.toString(),
          },
          signature: signature.toString(),
          signer: address.toString(),
        }),
      )

      toast.success(
        <div>
          Proposal submitted.
          <Link href={`${env.NEXT_PUBLIC_NANI_URL}/op/${userOpHash}`}>
            View the proposal
          </Link>
        </div>,
      )
    } catch (error) {
      console.error(error)
      const message =
        error instanceof Error ? error.message : 'An error occurred'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [judgments, filing, address, signTypedDataAsync])

  if (filing.status !== 'approved') return null

  if (filing.status === 'approved') {
    if (filing.userOpHash) {
      return (
        <div className="border-2 border-black bg-white p-2">
          <p className="text-lg">
            <Link href={`/op/${filing.userOpHash}`}>
              View the proposal to mint this filing.
            </Link>
          </p>
        </div>
      )
    }

    if (!address) {
      return (
        <div className="border-2 border-black bg-white p-2">
          <p className="text-lg">You must be connected to create a proposal.</p>
        </div>
      )
    }

    if (balance === BigInt(0)) {
      return (
        <div className="border-2 border-black bg-white p-2">
          <p className="text-lg">
            You must be a CURIA member to create a proposal to mint this.
          </p>
        </div>
      )
    }

    return (
      <div className="border-2 border-black bg-white p-2">
        <button
          className="rounded-md bg-black p-2 text-white"
          onClick={createMintPropOnCuria}
          disabled={loading}
        >
          {loading ? 'Proposing...' : 'Create Proposal on Curia'}
        </button>
      </div>
    )
  }
}
