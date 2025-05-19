import { body } from "express-validator";

const vehicleValidator = [
    body('plate_no')
        .notEmpty()
        .withMessage("plate number is required"),
    body('ownerId')
        .notEmpty()
        .withMessage('owner Id is required')
]

export { vehicleValidator }