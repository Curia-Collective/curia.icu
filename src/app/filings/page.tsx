import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusFilings } from './status-filings'

export default function Filings() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="rounded-md border-4 border-black bg-white p-6 lg:w-[80vw]">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="space-x-2">
            <TabsTrigger
              value="pending"
              className="bg-yellow-500 text-neutral-900"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="bg-orange-500 text-neutral-900"
            >
              Review
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="bg-green-500 text-neutral-900"
            >
              Judged
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="bg-red-500 text-neutral-900"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <StatusFilings status="pending" />
          </TabsContent>
          <TabsContent value="review">
            <StatusFilings status="review" />
          </TabsContent>
          <TabsContent value="approved">
            <StatusFilings status="approved" />
          </TabsContent>
          <TabsContent value="cancelled">
            <StatusFilings status="cancelled" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
