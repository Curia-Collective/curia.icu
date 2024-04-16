'use client'

import Link from 'next/link'
import { getFilingsByStatus } from '@/db/filings'
import { useQuery } from '@tanstack/react-query'
import { Loader2Icon, LoaderCircle } from 'lucide-react'

import { prettyDate } from '@/lib/time'
import { PrettyAccount } from '@/components/pretty-account'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const StatusFilings = ({
  status,
}: {
  status: 'pending' | 'review' | 'approved' | 'cancelled'
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['filings', status],
    queryFn: () => {
      return getFilingsByStatus(status)
    },
  })

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2Icon size={64} strokeWidth={2} className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="mr-2">
      <ul className="flex flex-col space-y-2">
        {data &&
          data.map((filing) => (
            <li key={filing.id}>
              <Link href={`/filings/${filing.id}`}>
                <Card className="overflow-hide bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <PrettyAccount address={filing.partyA} /> v.{' '}
                      <PrettyAccount address={filing.partyB} />
                    </CardTitle>
                    <CardDescription>
                      Filed on {prettyDate(filing.createdAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="truncate">{filing.description}</p>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
