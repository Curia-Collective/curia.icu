'use server'

import { z } from 'zod'

import { query } from './llm'

const schema = z.object({
  reason: z.string().min(1, 'Reason is required'),
  favours: z.enum(['A', 'B'], { required_error: 'Judgment is required' }),
})

export const aiJudgment = async (description: string) => {
  let attempts = 0
  let judgment = null

  while (attempts < 3 && !judgment) {
    attempts++
    try {
      judgment = await query(
        `Your task is to generate a judgment for this court case, you must return 'favours' and 'reason' for the judgment in the JSON format only e.g. "{ "reason": "The plaintiff has provided sufficient evidence", "favours": "A" }". 
                
                Favours can only be 'A' or 'B'. You must only return the JSON, nothing else.

                The case description is:

                ${description}`,
      )

      if (judgment) {
        const { reason, favours } = schema.parse(JSON.parse(judgment))
        return {
          reason,
          favours,
        }
      }
    } catch (error) {
      console.error(`Attempt ${attempts} failed:`, error)
      if (attempts >= 3) {
        throw new Error('Failed to generate judgment after 3 attempts')
      }
    }
  }

  throw new Error('Failed to generate judgment')
}
