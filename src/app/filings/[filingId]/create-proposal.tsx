'use client'

import Link from 'next/link'
import { SelectFilings, SelectJudgments } from '@/db/schema'
import { useAccount, useReadContract } from 'wagmi'

import { CURIA_ADDRESS, DAGON_ADDRESS } from '@/lib/contracts'
import { dagonAbi } from '@/lib/abis/dagon'
import { toast } from 'sonner'
import { DEFAULT_NETWORK } from '@/lib/siteConfig'
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

export const CreateProposal = ({ filing, judgments }: { filing: SelectFilings, judgments: SelectJudgments[] | null }) => {
  const { address } = useAccount()
  const { data: balance } = useReadContract({
    address: DAGON_ADDRESS,
    abi: dagonAbi,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(CURIA_ADDRESS)] : undefined,
    chainId: DEFAULT_NETWORK.id,
  })

  const createMintPropOnCuria = async () => {
    try {
    //   if (judgments === null || judgments.length < 2) {
    //     throw new Error('Not enough judgments to approve')
    //   }

    //   // create proposal
    //   const tokenUri = {
    //     name: filing.title,
    //     description: filing.description,
    //     image: filing.imageUrl,
    //     external_url: `https://www.curia.icu/filings/${filing.id}`,
    //     attributes: [
    //         {
    //             "display_type": "date", 
    //             trait_type: 'Filing Date',
    //             value: toUnixTimestamp(new Date(filing.createdAt))
    //         },
    //         {
    //             "display_type": "boost_percentage", 
    //             "trait_type": "For Party A", 
    //             "value": (judgments.reduce((acc, judgment) => {
    //                 return judgment.favours === 'A' ? acc + 1 : acc
    //             }, 0) / judgments.length) * 100
    //         }, 
    //         {
    //             "display_type": "boost_percentage", 
    //             "trait_type": "For Party B", 
    //             "value": (judgments.reduce((acc, judgment) => {
    //                 return judgment.favours === 'B' ? acc + 1 : acc
    //             }, 0) / judgments.length) * 100
    //         },
    //         ...judgments.map((judgment) => ({
    //             trait_type: `Judge ${judgment.judge}`,
    //             value: `${judgment.reasoning}
                
    //             In favour of ${judgment.favours}
                
    //             Signature: ${judgment.signature}`,
    //         })),
    //     ],
    //   }

    //   const uri = 'ipfs://QmbwcUEN5yC43X3sYVqsBmSUQMbya17kHveFQ8g3GzoXDk' // await pinJsonToIpfs(tokenUri)

    //   const callData = encodeExecuteBatch([
    //     {
    //         target: '0x00000000000045c141ce339bc666ec791646e43c',
    //         value: 0n,
    //         data: encodeFunctionData({
    //             abi: JudgementsAbi,
    //             functionName: 'judge',
    //             args: [
    //                 getAddress(filing.partyA),
    //                 0n,
    //                 BigInt(1),
    //                 '0x',
    //                 uri,
    //             ],
    //         })
    //     },
    //     {
    //         target: '0x00000000000045c141ce339bc666ec791646e43c',
    //         value: 0n,
    //         data: encodeFunctionData({
    //             abi: JudgementsAbi,
    //             functionName: 'judge',
    //             args: [
    //                 getAddress(filing.partyB),
    //                 0n,
    //                 BigInt(1),
    //                 '0x',
    //                 uri,
    //             ],
    //         })
    //     }
    //   ])

    //   const client = getPimlicoBundlerClient({
    //     chainId: DEFAULT_NETWORK.id,
    //   })

    //   const g = await client.getUserOperationGasPrice()

    //   let userOperation = {
    //     sender: CURIA_ADDRESS,
    //     callData: callData,
    //     nonce: await getAccountNonce(
    //       getPublicClient({ chainId: DEFAULT_NETWORK.id }),
    //       {
    //         sender: CURIA_ADDRESS,
    //         entryPoint: ENTRYPOINT_ADDRESS_V06,
    //         key: 0n,
    //       },
    //     ),
    //     initCode: '0x' as Hex,
    //     maxFeePerGas: g.fast.maxFeePerGas,
    //     maxPriorityFeePerGas: g.fast.maxPriorityFeePerGas,
    //     preVerificationGas: 0n,
    //     verificationGasLimit: 0n,
    //     callGasLimit: 0n,
    //     paymasterAndData: NEETH_ADDRESS as Address,
    //     signature: DUMMY_SIGNATURE as Hex,
    //   }

    //   const gas = await client.estimateUserOperationGas({
    //     userOperation: userOperation,
    //   })

    //   userOperation.preVerificationGas = gas.preVerificationGas
    //   userOperation.verificationGasLimit = gas.verificationGasLimit * 3n
    //   userOperation.callGasLimit = gas.callGasLimit

    //   const userOpHash = getUserOperationHash({
    //     userOperation: userOperation,
    //     entryPoint: ENTRYPOINT_ADDRESS_V06,
    //     chainId: DEFAULT_NETWORK.id,
    //   })

    //   toast.success(`Proposing Transaction... ${userOpHash}`)

    //   const proposal = await createProposal({
    //     userOpHash,
    //     sender: userOperation.sender,
    //     chain: 'arbitrum',
    //     nonce: userOperation.nonce.toString(),
    //     maxFeePerGas: userOperation.maxFeePerGas,
    //     maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas,
    //     preVerificationGas: userOperation.preVerificationGas,
    //     verificationGasLimit: userOperation.verificationGasLimit,
    //     callGasLimit: userOperation.callGasLimit,
    //     callData: userOperation.callData,
    //     initCode: userOperation.initCode,
    //     paymasterAndData: userOperation.paymasterAndData,
    //   })
      
    //   toast.success(<div>
    //     Proposal submitted.
    //     <Link href={`/op/${userOpHash}`}>View the proposal</Link>
    //  </div>)
      toast.success('Proposing to CURIA is not yet implemented.')
    } catch (error) {
      console.error(error)
      const message =
        error instanceof Error ? error.message : 'An error occurred'
      toast.error(message)
    }
  }

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
        >
          Create Proposal on Curia
        </button>
      </div>
    )
  }
}
