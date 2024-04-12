'use client'

import Link from 'next/link'
// import { getFilingsByStatus } from '@/db/filings'
// import { useQuery } from '@tanstack/react-query'

// import { prettyDate } from '@/lib/time'
// import { PrettyAddress } from '@/components/pretty-address'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'

export const StatusFilings = ({
  status,
}: {
  status: 'pending' | 'review' | 'approved' | 'cancelled'
}) => {
//   const { data, isLoading } = useQuery({
//     queryKey: ['filings', status],
//     queryFn: () => {
//       return getFilingsByStatus(status)
//     },
//   })
    return (<div>Placeholder {status}</div>)
//   return (
//     <div className="mr-2">
//       <ul className="flex flex-col space-y-2">
//         {data ? (
//           data.map((filing) => (
//             <li key={filing.id}>
//               <Card className="overflow-hide bg-white">
//                 <CardHeader>
//                   <CardTitle className="text-lg">
//                     <PrettyAddress address={filing.partyA} /> v.{' '}
//                     <PrettyAddress address={filing.partyB} />
//                   </CardTitle>
//                   <CardDescription>
//                     Filed on {prettyDate(filing.createdAt)}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="truncate">{filing.description}</p>
//                 </CardContent>
//                 <CardFooter>
//                   <Link href={`/curia/${filing.id}`}>View</Link>
//                 </CardFooter>
//               </Card>
//             </li>
//           ))
//         ) : (
//           <p>Loading...</p>
//         )}
//       </ul>
//     </div>
//   )
}
