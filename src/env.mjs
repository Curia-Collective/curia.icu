// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    DATABASE_URL: z.string().url(),
    OPENROUTER_API_KEY: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    PINATA_JWT: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_WC_ID: z.string().min(1),
    NEXT_PUBLIC_ANKR_API_KEY: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PINATA_JWT: process.env.PINATA_JWT,
    
    NEXT_PUBLIC_ANKR_API_KEY: process.env.NEXT_PUBLIC_ANKR_API_KEY, 
    NEXT_PUBLIC_WC_ID:
      process.env.NEXT_PUBLIC_WC_ID,
  },
});