import { makeApi } from '@zodios/core'
import { createUser, getUser } from 'src/endpoints/user'

export const apiSchema = makeApi([createUser, getUser])

export type Api = typeof apiSchema
