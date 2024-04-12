'use client'

import { useState } from 'react'
import { addJudgment } from '@/db/filings'
import { SelectFilings } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useAccount, useReadContract, useSignTypedData } from 'wagmi'
import { z } from 'zod'

import { dagonAbi } from '@/lib/abis/dagon' 
import { DAGON_ADDRESS, CURIA_ADDRESS } from '@/lib/contracts'
import { cn } from '@/lib/utils'

const schema = z.object({
  reason: z.string().min(1, 'Reason is required'),
  favours: z.enum(['A', 'B'], { required_error: 'Judgment is required' }),
})

type FormData = z.infer<typeof schema>

export const JudgeWithReason = ({ filing }: { filing: SelectFilings }) => {
  const { address } = useAccount()
  const { signTypedDataAsync } = useSignTypedData()
  const { data: balance, refetch } = useReadContract({
    abi: dagonAbi,
    address: DAGON_ADDRESS,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(CURIA_ADDRESS)] : undefined,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true)

      if (!address) {
        // setShowAuthFlow(true) show rainbow modal
        throw new Error('Please connect your wallet to submit a judgment.')
      }

      if (!balance || balance === BigInt(0)) {
        throw new Error('You need to hold CURIA tokens to submit a judgment.')
      }

      const timestamp = Math.floor(Date.now() / 1000) // Get current Unix timestamp

      const signature = await signTypedDataAsync({
        types: {
          Judgment: [
            { name: 'filing', type: 'string' },
            { name: 'reason', type: 'string' },
            { name: 'favours', type: 'string' },
            { name: 'timestamp', type: 'uint256' },
          ],
        },
        primaryType: 'Judgment',
        message: {
          filing: filing.id,
          reason: data.reason,
          favours: data.favours,
          timestamp: BigInt(timestamp),
        },
      })

      // Call insertJudgment with the signature and form data
      const judgmentId = (await addJudgment({
        filingId: filing.id,
        judge: address,
        reasoning: data.reason,
        favours: data.favours,
        timestamp: timestamp,
        signature,
      })).id

      toast.success('Judgment submitted successfully with ID: ' + judgmentId)
    } catch (error) {
      // Handle error
      console.error('Error submitting favours:', error)
      toast.error(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-2 border-black bg-white p-3"
    >
      <div className="mb-2 flex flex-col">
        <label htmlFor="reason" className="mb-1 text-lg italic">
          Why ye judge so?
        </label>
        <textarea
          id="reason"
          {...register('reason')}
          className="min-h-[20vh]"
        />
        {errors.reason && <span>{errors.reason.message}</span>}
      </div>

      <div className="mb-2 flex items-center">
        <label htmlFor="favours" className="mr-2 text-lg italic">
          In favor of:
        </label>
        <select
          id="favours"
          {...register('favours')}
          className="m-0 min-w-[5rem] text-xs text-black"
        >
          <option value="">Select</option>
          <option value="A">Party A</option>
          <option value="B">Party B</option>
        </select>
        {errors.favours && <span>{errors.favours.message}</span>}
      </div>

      <button
        className={cn(
          'appearance-none',
          'border-none p-2 text-lg font-bold tracking-wide text-black outline-none',
        )}
        disabled={loading}
        type="submit"
      >
        {loading ? 'Judging' : 'Judge'}
      </button>
    </form>
  )
}
