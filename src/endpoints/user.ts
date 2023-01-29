import { makeEndpoint } from "@zodios/core";
import z from "zod"


export const createUser = makeEndpoint({
	method: 'post',
	path: '/users',
	alias: 'createUser',
	description: 'Create user',
	parameters: [
		{
			name: 'body',
			type: 'Body',
			schema: z.object({
                mail: z.string().email(),
                password: z.string().min(8),
                role_id: z.string().uuid()
              })
		}
	],
	status: 201,
    response: z.object({
        data: z.object({
            id: z.string().uuid(),
            mail: z.string().email(),
            role_id: z.string().uuid()
        })
    }),
    error: z.object({
        error: z.string(),
        code: z.number()
    })
})