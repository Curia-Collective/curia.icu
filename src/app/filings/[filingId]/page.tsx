import { getFilingById } from '@/db/filings'

import { CreateProposal } from './create-proposal'
import { FilingInfo } from './info'
import { JudgeWithReason } from './judge-with-reason'
import { Judgments } from './judgments'

const FilingPage = async ({
  params: { filingId },
}: {
  params: { filingId: string }
}) => {
  const filing = await getFilingById(filingId)

  return (
    <div className="flex items-center justify-center p-6">
      <div className="mb-[10rem] rounded-md border-4 border-black bg-white p-0 lg:w-[80vw]">
        <FilingInfo filing={filing} />
        <JudgeWithReason filing={filing} />
        <Judgments filingId={filing.id} />
        <CreateProposal filing={filing} />
      </div>
    </div>
  )
}

export default FilingPage
