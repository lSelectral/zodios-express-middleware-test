import { Method, ZodiosPathsByMethod } from '@zodios/core'
import { ZodiosRequestHandler } from '@zodios/express'
import { Context } from '../config/zodios'
import { Api } from '../config/zodios/api-schema'

export type Middleware<
	M extends Method,
	Path extends ZodiosPathsByMethod<Api, Method>
> = ZodiosRequestHandler<Api, Context, M, Path>

export const verifyAuthentication = <
	M extends Method,
	Path extends ZodiosPathsByMethod<Api, Method>
>(
	...permissions: string[]
) => {
	const middleware: Middleware<M, Path> = (req, res, next) => {
		if (!req.session) {
			return res
				.status(401)
				.json({ error: 'Not authenticated', code: 401 })
		}

		if (permissions.length > 0) {
			const { permissions: userPermissions } = req.session
			const hasPermission = permissions.some(permission =>
				userPermissions.includes(permission)
			)

			if (!hasPermission) {
				return res
					.status(403)
					.send({ error: 'Not authorized', code: 403 })
			}
		}
		next()
	}
	return middleware
}
