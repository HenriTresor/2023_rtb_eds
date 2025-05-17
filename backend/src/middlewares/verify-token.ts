import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

export default async (req: any, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'] || req.headers['Authorization']
        if (!authHeader) return next({ status: false, code: 403, message: "Auth headers required" })
        const token = authHeader.split(' ')[1]
        if (!token) return next({ status: false, message: "token is required", code: 403 })
        const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY as string)
        console.log(decodedToken)
        if (!decodedToken.userId) return next({ status: false, code: 403, message: "No user id found" })
        if (decodedToken.role !== 'ADMIN') return next({ status: false, code: 401, message: "You don't have permission to access this resource" })
        req.userId = decodedToken.userId
        next()
    } catch (error) {
        next(error)
    }
}