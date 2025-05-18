import { body } from "express-validator";

export const signupValidator = [
    body('email')
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("provide valid email address"),
    body('username')
        .notEmpty()
        .withMessage('username is required')
        .isString(),
    body('password')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 chars')
]

export const loginValidator = [
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage("email is required"),
    body('password')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 chars')
]