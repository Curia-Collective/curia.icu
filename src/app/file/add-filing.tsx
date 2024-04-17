'use client'

import { useState } from 'react'
import { insertFiling } from '@/db/filings'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon, SparkleIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { isAddress } from 'viem'
import { z } from 'zod'

import { getEnsAddress } from '@/lib/ens'
import { getCaseTitle, getFilingImage } from '@/lib/getFilingImage'
import { MagicWandIcon } from '@radix-ui/react-icons'

const filingSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  partyA: z.string().refine(
    async (val) => {
      if (isAddress(val)) return true
      if (val.endsWith('.eth')) {
        return true
      }
      return false
    },
    { message: 'Must be an address or ENS name.' },
  ),
  partyB: z.string().refine(
    async (val) => {
      if (isAddress(val)) return true
      if (val.endsWith('.eth')) {
        return true
      }
      return false
    },
    { message: 'Must be an address or ENS name.' },
  ),
  description: z.string().min(1, 'Description is required'),
})

type FilingFormData = z.infer<typeof filingSchema>

export const AddFiling = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FilingFormData>({
    resolver: zodResolver(filingSchema),
  })
  const descriptionValue = watch("description")
  const titleValue = watch("title")

  const [loading, setLoading] = useState(false)
  const [loadingTitle, setLoadingTitle] = useState(false)

  const [caseInfo, setCaseInfo] = useState<{
    id: string
    partyA: string
    partyB: string
    description: string
    image: string
  } | null>(null)

  const onSubmit = async (data: FilingFormData) => {
    try {
      setLoading(true)

      const [partyA, partyB] = await Promise.all([
        resolveAddress(data.partyA),
        resolveAddress(data.partyB),
      ])
      toast.success(
        <div>
          <p>Addresses resolved successfully!</p>
        </div>,
      )
      // Handle form submission with resolved addresses
      const image = await getFilingImage(data.description.substring(0, 200))
      const imageUrl = image.replace(
        'ipfs://',
        'https://content.wrappr.wtf/ipfs/',
      )
      toast.success(
        <div>
          <p>Image generated successfully!</p>
        </div>,
      )

      toast.success('Title generated successfully!' + data.title)

      // save to db
      const id = await insertFiling({
        title: data.title,
        partyA,
        partyB,
        description: data.description,
        imageUrl: image,
      })

      setCaseInfo({
        id,
        partyA,
        partyB,
        description: data.description,
        image: imageUrl,
      })

      toast.success(
        <div>
          <p>Filing created successfully!</p>
        </div>,
      )
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resolveAddress = async (value: string) => {
    if (isAddress(value)) return value
    if (value.endsWith('.eth')) {
      const address = await getEnsAddress(value)
      if (address) return address
    }
    throw new Error('Invalid address or ENS name')
  }

  const handleMagicTitle = async () => {
    try {
      setLoadingTitle(true)
      const title = await getCaseTitle(descriptionValue)
      setValue("title", title)
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'An error occurred generating title')
    } finally {
      setLoadingTitle(false)
    }
  }

  return (
    <div className="h-fit rounded-[16px] border-4 border-black bg-white p-4 md:col-span-2 lg:w-[80vw]">
      {caseInfo ? (
        <div className="">
          <h3 className="text-lg">
            <strong>{caseInfo.partyA}</strong> v.{' '}
            <strong>{caseInfo.partyB}</strong>
          </h3>
          <p className="whitespace-pre-wrap">{caseInfo.description}</p>
          <img src={caseInfo.image} alt="Case Image" className="mt-4" />
        </div>
      ) : (
        <>
          <h2 className="mb-2 text-2xl">📤 File</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <div className="flex flex-row items-center space-x-4 justify-between">
              <div className="w-full">
                <label htmlFor="title" className="mb-1 block">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full rounded border px-2 py-1"
                  disabled={loadingTitle}
                  {...register('title')}
                />
              </div>
              <div>
                <button type="button" disabled={loadingTitle} className="w-full rounded-full bg-purple-300 p-2 tracking-wide text-white" onClick={handleMagicTitle}>
                  <MagicWandIcon className="text-black" />
                </button>
              </div>
              </div>
              {errors.title && (
                <span className="text-red">{errors.title.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="partyA" className="mb-1 block">
                Party A (Ethereum Address)
              </label>
              <input
                type="text"
                id="partyA"
                className="w-full rounded border px-2 py-1"
                {...register('partyA')}
              />
              {errors.partyA && (
                <span className="text-red">{errors.partyA.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="partyB" className="mb-1 block">
                Party B (Ethereum Address)
              </label>
              <input
                type="text"
                id="partyB"
                className="w-full rounded border px-2 py-1"
                {...register('partyB')}
              />
              {errors.partyB && (
                <span className="text-red">{errors.partyB.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="mb-1 block">
                Description of the Dispute
              </label>
              <textarea
                id="description"
                className="min-h-[30vh] w-full rounded border px-2 py-1"
                {...register('description')}
              ></textarea>
              {errors.description && (
                <span className="text-red">{errors.description.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded bg-black px-4 py-2 tracking-wide text-white"
            >
              {loading ? (
                <LoaderIcon className="animate-spin text-white" />
              ) : (
                'Create'
              )}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
