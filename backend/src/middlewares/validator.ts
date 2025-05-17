import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    console.log(errors.array())
    if (!errors.isEmpty()) {
        res.status(400).json({ status: false, message: errors.array()[0].msg });
        return;
    }
    next();
};
export default validate