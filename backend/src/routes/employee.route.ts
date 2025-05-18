import { Router } from "express";
import { addEmployeeController, getEmployeeController, getEmployeesController, removeEmployeeController, updateEmployeeController } from "../controllers/employee.controller";
import employeeValidator from "../validators/employee.validator";
import validate from "../middlewares/validator";
import verifyToken from "../middlewares/verify-token";

const router = Router()

router.get('/', verifyToken, getEmployeesController)
router.get('/:id', verifyToken, getEmployeeController)
router.post('/', employeeValidator, validate, verifyToken, addEmployeeController)
router.put('/:id', verifyToken, updateEmployeeController)
router.delete('/:id', verifyToken, removeEmployeeController)

export default router