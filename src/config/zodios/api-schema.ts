import { makeApi } from '@zodios/core'
import { createUser } from 'src/endpoints/user'

export const apiSchema = makeApi([
	createUser,
])
