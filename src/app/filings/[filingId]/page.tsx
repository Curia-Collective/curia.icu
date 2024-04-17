import { getFilingById, getJudgmentsByFilingId } from '@/db/filings'

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
  const judgments = await getJudgmentsByFilingId(filing.id)
  console.log(filing, judgments)

  return (
    <div className="flex items-center justify-center p-6">
      <div className="mb-[10rem] rounded-md border-4 border-black bg-white p-0 lg:w-[80vw]">
        <FilingInfo filing={filing} />
        <JudgeWithReason filing={filing} />
        <Judgments judgments={judgments} />
        <CreateProposal filing={filing} judgments={judgments} />
      </div>
    </div>
  )
}

export default FilingPage
