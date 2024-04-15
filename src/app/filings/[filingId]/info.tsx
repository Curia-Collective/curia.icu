import { SelectFilings } from '@/db/schema'

import { FilingStatusBadge } from '@/app/filings/[filingId]/filing-status'
import { getWrapprUri } from '@/lib/ipfs'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export const FilingInfo = ({ filing }: { filing: SelectFilings }) => {
  return (
    <div className="border-2 border-black bg-white p-3">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-base">{filing.title}</h2>
        <FilingStatusBadge status={filing.status} />
      </div>
      <div className="embossed-line" />
      <div className="flex flex-row space-x-2">
        <div className="w-[500px]">
          <AspectRatio ratio={1 / 1}>
            <img
              src={getWrapprUri(filing.imageUrl)}
              alt={`${filing.partyA} v. ${filing.partyB} image`}
              className="rounded-lg object-cover"
            />
          </AspectRatio>
        </div>
        <div className="max-w-2xl">
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="font-bold">Party A</td>
                <td>{filing.partyA}</td>
              </tr>
              <tr>
                <td className="font-bold">Party B</td>
                <td>{filing.partyB}</td>
              </tr>
            </tbody>
          </table>
          <div className="embossed-line" />
          <h3 className="text-sm font-bold">Description</h3>
          <div>
            <p className="mb-2 whitespace-pre-wrap text-sm">
              {filing.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
