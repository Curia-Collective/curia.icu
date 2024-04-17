'use client'

import { FilingStatusBadge } from '@/app/filings/[filingId]/filing-status'
import { SelectFilings } from '@/db/schema'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { getWrapprUri } from '@/lib/ipfs'
import { cn } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { zeroAddress } from 'viem'

export const FilingInfo = ({ filing }: { filing: SelectFilings }) => {
  return (
    <div className="border-2 border-black bg-white p-3">
      <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h2 className="mb-2 text-base md:mb-0">{filing.title}</h2>
        <FilingStatusBadge status={filing.status} />
      </div>
      <div className="embossed-line mb-4" />
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <div className="w-full md:w-1/2">
          <AspectRatio ratio={1 / 1}>
            <img
              src={getWrapprUri(filing.imageUrl)}
              alt={`${filing.partyA} v. ${filing.partyB} image`}
              className="rounded-lg object-cover"
            />
          </AspectRatio>
        </div>
        <div className="w-full md:w-1/2">
          <table className="mb-4 table-auto">
            <tbody>
              {filing.partyA !== zeroAddress && (
                <tr>
                  <td className="pr-4 font-bold">Party A</td>
                  <td>{filing.partyA}</td>
                </tr>
              )}
              {filing.partyB !== zeroAddress && (
                <tr>
                  <td className="pr-4 font-bold">Party B</td>
                  <td>{filing.partyB}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="embossed-line mb-4" />
          <h3 className="mb-2 text-sm font-bold">Description</h3>
          <div className="prose">
            <ReactMarkdown
              className="prose"
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ node, className, children, ...props }) => (
                  <pre className="overflow-auto rounded-md bg-gray-100 p-2">
                    <code
                      className={cn(className, 'font-mono text-sm')}
                      {...props}
                    >
                      {children}
                    </code>
                  </pre>
                ),
                link: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {filing.description}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
