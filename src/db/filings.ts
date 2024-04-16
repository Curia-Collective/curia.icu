'use server'

import { eq } from 'drizzle-orm'
import { zeroAddress } from 'viem'

import { aiJudgment } from '@/lib/ai-judgment'
import { db } from '.'
import {
  InsertFiling,
  InsertJudgment,
  SelectJudgments,
  filings,
  judgments,
} from './schema'

const CURIA_THRESHOLD = 2

export const insertFiling = async (data: InsertFiling) => {
  return (
    await db.insert(filings).values(data).returning({
      id: filings.id,
    })
  )[0].id
}

export const getFilingsByStatus = async (
  status: 'pending' | 'review' | 'approved' | 'cancelled',
) => {
  return await db.select().from(filings).where(eq(filings.status, status))
}

export const getFilingById = async (id: string) => {
  return (await db.select().from(filings).where(eq(filings.id, id)))[0]
}

export const addJudgment = async (data: InsertJudgment) => {
  if (data.favours !== 'A' && data.favours !== 'B') {
    throw new Error('Invalid judgment')
  }

  const filing = await getFilingById(data.filingId)
  if (filing.status === 'pending') {
    await db
      .update(filings)
      .set({ status: 'review' })
      .where(eq(filings.id, data.filingId))
  } else if (filing.status === 'review') {
    const j = await db
      .select()
      .from(judgments)
      .where(eq(judgments.filingId, data.filingId))
    if (j.length >= CURIA_THRESHOLD) {
      await db
        .update(filings)
        .set({ status: 'approved' })
        .where(eq(filings.id, data.filingId))
    }
  }

  return (
    await db.insert(judgments).values(data).returning({
      id: judgments.id,
    })
  )[0]
}

export const getJudgmentsByFilingId = async (
  filingId: string,
): Promise<SelectJudgments[] | null> => {
  const filing = await getFilingById(filingId)
  if (filing.status !== 'approved' && filing.status !== 'cancelled') return null

  const data = await db
    .select()
    .from(judgments)
    .where(eq(judgments.filingId, filingId))

  // if data does not include judgment from zeroAddress then add AI judgment

  // check if data includes judgment with judge = zeroAddress
  const zeroAddressJudgment = data.find((j) => j.judge === zeroAddress)
  if (!zeroAddressJudgment) {
    const filing = await getFilingById(filingId)
    const { reason, favours } = await aiJudgment(filing.description)
    const judgment = {
      filingId: filing.id,
      judge: zeroAddress,
      reasoning: reason,
      favours: favours,
      timestamp: Math.floor(Date.now() / 1000),
      signature: '0x',
    }
    await addJudgment(judgment)

    const data = await db
      .select()
      .from(judgments)
      .where(eq(judgments.filingId, filingId))

    return data
  }

  return data
}
