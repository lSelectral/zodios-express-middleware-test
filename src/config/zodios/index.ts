import { zodiosContext } from '@zodios/express'
import z from 'zod'
import { apiSchema } from './api-schema'

const ctxSchema = z.object({
	session: z.object({
		id: z.string().uuid(),
		mail: z.string().email(),
		role_id: z.string(),
		permissions: z.array(z.string()),
		session_created_at: z.date(),
		session_expires_at: z.date()
	})
})

export type Context = typeof ctxSchema

export const ctx = zodiosContext(ctxSchema)

export const router = ctx.router(apiSchema)

export const app = ctx.app(apiSchema)
