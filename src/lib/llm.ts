'use server'

import { env } from '@/env.mjs'
import OpenAI from 'openai'

const OPENROUTER_API_KEY = env.OPENROUTER_API_KEY

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://nani.ooo/', // Optional, for including your app on openrouter.ai rankings.
    'X-Title': 'NANI', // Optional. Shows in rankings on openrouter.ai.
  },
  // dangerouslyAllowBrowser: true,
})

export async function query(description: string, model?: string) {
  const completion = await openai.chat.completions.create({
    model: model ?? 'openrouter/auto',
    messages: [
      {
        role: 'user',
        content: description,
      },
    ],
  })

  return completion.choices[0].message.content
}
