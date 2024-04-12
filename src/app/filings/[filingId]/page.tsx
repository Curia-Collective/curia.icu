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
  const judgments = await getJudgmentsByFilingId(filing.id);
  
  return (
    <div className="mt-[2rem] mb-[5rem]">
      <FilingInfo filing={filing} />
      <JudgeWithReason filing={filing} />
      <Judgments judgments={judgments} />
      <CreateProposal filing={filing} judgments={judgments} />
    </div>
  )
}

export default FilingPage
