import { NextFunction, Request, Response } from 'express'

export const verifyAuthentication = (...permissions: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.session) {
        res.status(401).send('Not authenticated')
            return
        }
    
        if (permissions.length > 0) {
            const { permissions: userPermissions } = req.session
            const hasPermission = permissions.some(permission => userPermissions.includes(permission))
        
            if (!hasPermission) {
                res.status(403).send('Not authorized')
                return
            }
        }
    
        next()
    }
}    