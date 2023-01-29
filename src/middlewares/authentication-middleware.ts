import { Method, ZodiosPathsByMethod } from '@zodios/core'
import { ZodiosRequestHandler } from '@zodios/express'
import { Context } from '../config/zodios'
import { Api } from '../config/zodios/api-schema'

type Middleware = ZodiosRequestHandler<
	Api,
	Context,
	Method,
	ZodiosPathsByMethod<Api, Method>
>

export const verifyAuthentication = (...permissions: string[]) => {
	const middleware: Middleware = (req, res, next) => {
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
