'use server'
import { keccak256, toHex } from "viem"
import { pinata } from "./pinata"
import { env } from "@/env.mjs"
import OpenAI from "openai"
import { query } from "./llm"

export const getFilingImage = async (description: string): Promise<string> => {
    try {
      const prompt = await query(
        'Generate only an image prompt, no prefix, based on description. The image should be black and white pixel art. The description is:/n/n' +
          description,
        'cognitivecomputations/dolphin-mixtral-8x7b',
      )
  
      if (!prompt) {
        throw new Error('Failed to generate prompt for image')
      }
    
      const dalle = new OpenAI({
        apiKey: env.OPENAI_API_KEY,
      })
  
      const dalleResponse = await dalle.images.generate({
        model: 'dall-e-3',
        prompt,
      })
  
      const imageUrl = dalleResponse.data[0].url
      if (!imageUrl) {
        throw new Error('Failed to generate image')
      }
      
      const imageResponse = await fetch(imageUrl)
      const stream = imageResponse.body
      const res = await pinata.pinFileToIPFS(stream, {
        pinataMetadata: {
          name: `filing-${keccak256(toHex(description))}`,
        },
      })
      const ipfsHash = res.IpfsHash
  
      return `ipfs://${ipfsHash}`
    } catch (error) {
      console.error('Error generating filing image:', error)
      throw error
    }
  }
  

export const getCaseTitle = async (description: string): Promise<string> => {
    const title = await query(
      'Generate a title for this court case, the title must not exceed 10 words. You should only return the title of the case and nothing else. The case description is:/n/n' +
        description,
      'cognitivecomputations/dolphin-mixtral-8x7b',
    )
  
    if (!title) {
      throw new Error('Failed to generate title')
    }
  
    return title
  }