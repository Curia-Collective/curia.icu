import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import { StatusFilings } from './status-filings';

export default function Filings() {
  return <div className="flex items-center justify-center p-6">
    <div className="border-4 border-black p-6 bg-white lg:w-[80vw] rounded-md">
    <Tabs defaultValue="pending" className="w-full">
      <TabsList className="space-x-2">
        <TabsTrigger value="pending" className="text-neutral-900 bg-yellow-500">
          Pending
        </TabsTrigger>
        <TabsTrigger value="review" className="text-neutral-900 bg-orange-500">
          Review
        </TabsTrigger>
        <TabsTrigger value="approved" className="text-neutral-900 bg-green-500">
          Judged
        </TabsTrigger>
        <TabsTrigger value="cancelled" className="text-neutral-900 bg-red-500">
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
}