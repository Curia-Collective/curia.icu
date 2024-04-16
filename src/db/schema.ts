import { relations, sql } from 'drizzle-orm'
import {
  bigint,
  char,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const statusEnum = pgEnum('status', [
  'pending',
  'review',
  'approved',
  'cancelled',
])

export const judgments = pgTable('judgments', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  filingId: uuid('filing_id')
    .notNull()
    .references(() => filings.id),
  judge: char('judge', { length: 42 }).notNull(),
  reasoning: text('reasoning').notNull(),
  favours: char('favours', { length: 1 }).notNull(),
  timestamp: integer('timestamp').notNull(),
  signature: varchar('signature').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectJudgments = createSelectSchema(judgments)
export type SelectJudgments = z.infer<typeof selectJudgments>

export const insertJudgmentSchema = createInsertSchema(judgments)
export type InsertJudgment = z.infer<typeof insertJudgmentSchema>

export const filings = pgTable('filings', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  partyA: text('party_a').notNull(),
  partyB: text('party_b').notNull(),
  imageUrl: text('image_url').notNull(),
  description: text('description').notNull(),
  status: statusEnum('status').notNull().default('pending'),
  userOpHash: char('user_op_hash', { length: 66 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const selectFilings = createSelectSchema(filings)
export type SelectFilings = z.infer<typeof selectFilings>

export const insertFilingSchema = createInsertSchema(filings)
export type InsertFiling = z.infer<typeof insertFilingSchema>

export type FilingStatus = SelectFilings['status']
