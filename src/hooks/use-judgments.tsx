import { getJudgmentsByFilingId } from "@/db/filings"
import { useQuery } from "@tanstack/react-query"

export const useJudgments = (filingId: string) => {
    return useQuery({
        queryKey: ["judgments", filingId],
        queryFn: () => getJudgmentsByFilingId(filingId),
        enabled: !!filingId,
    })
}