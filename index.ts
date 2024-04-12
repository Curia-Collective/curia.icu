import { db } from "@/db"
import { insertFiling, insertJudgment } from "@/db/filings"
import { filings, insertJudgmentSchema } from "@/db/schema"
import fs from 'fs'
import path from 'path'

const loadDataFromJson = (p: string) => {
    const filePath = path.join(__dirname, p)
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(jsonData)
}

const addFilings = async () => {
    const filingsData = loadDataFromJson('./filings.json')

    console.log(filingsData)
    for (const filing of filingsData) {
        await insertFiling({
            id: filing.id,
            title: filing.title,
            partyA: filing.party_a,
            partyB: filing.party_b,
            description: filing.description,
            imageUrl: filing.image_url,
            status: filing.status,
            userOpHash: filing.user_op_hash,
            createdAt: new Date(filing.created_at),
            updatedAt: new Date(filing.updated_at)
        })
    }
}

const addJudgments = async () => {
    const judgmentsData = loadDataFromJson('./judgments.json')

    console.log(judgmentsData)
    for (const judgment of judgmentsData) {
        await insertJudgment({
            id: judgment.id,
            filingId: judgment.filing_id,
            judge: judgment.judge,
            reasoning: judgment.reasoning,
            favours: judgment.favours,
            timestamp: judgment.timestamp,
            signature: judgment.signature,
            createdAt: new Date(judgment.created_at),
            updatedAt: new Date(judgment.updated_at)
        })
    }
}

addJudgments().then(() => {
    console.log('done')
    process.exit(0)
}).catch((e) => {
    console.error(e)
    process.exit(1)
})