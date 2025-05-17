import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
    status?: boolean;
    code?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);
    res.status(err.code || 500).json({
        message: err.message || 'Internal Server Error', status: false
    });
};