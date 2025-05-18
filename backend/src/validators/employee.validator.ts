import { body } from "express-validator";

export const employeeValidator = [
    body('firstName')
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2-50 characters')
        .trim(),
    body('lastName')
        .notEmpty().withMessage('Last name is required')
        .isString().withMessage('Last name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2-50 characters')
        .trim(),
    body('nationalIdentity')
        .notEmpty().withMessage('National identity is required')
        .isString().withMessage('National identity must be a string')
        .isLength({ min: 5, max: 20 }).withMessage('National identity must be between 5-20 characters')
        .trim(),
    body('telephone')
        .notEmpty().withMessage('Telephone is required')
        .isMobilePhone('any').withMessage('Must be a valid phone number')
        .trim(),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),

    body('department')
        .notEmpty().withMessage('Department is required')
        .isString().withMessage('Department must be a string')
        .isIn(['IT', 'HR', 'Finance', 'Operations', 'Sales', 'Marketing']).withMessage('Invalid department')
        .trim(),

    body('position')
        .notEmpty().withMessage('Position is required')
        .isString().withMessage('Position must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Position must be between 2-50 characters')
        .trim(),

    body('laptopManufacturer')
        .notEmpty().withMessage('Laptop manufacturer is required')
        .isString().withMessage('Laptop manufacturer must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Laptop manufacturer must be between 2-50 characters')
        .trim(),

    body('model')
        .notEmpty().withMessage('Model is required')
        .isString().withMessage('Model must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Model must be between 2-50 characters')
        .trim(),

    body('serialNumber')
        .notEmpty().withMessage('Serial number is required')
        .isString().withMessage('Serial number must be a string')
        .isLength({ min: 5, max: 50 }).withMessage('Serial number must be between 5-50 characters')
        .trim()
];

export default employeeValidator;