import { NextFunction, Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import { createEmployee, getEmployee, getEmployees, removeEmployee, updateEmployee } from "../services/employee.service"

export const addEmployeeController = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const newEmployee = await createEmployee(req.body)
    if (!newEmployee) {
        console.log(newEmployee)
        return next({ message: "Error adding employee. Please try again", status: false, code: 500 })
    }

    res.status(201).json({
        status: true,
        employee: newEmployee
    })
})
export const getEmployeesController = expressAsyncHandler(async (req, res, next) => {
    const employees = await getEmployees(Number(req.query.page), Number(req.query.pageSize))
    res.status(200).json({
        status: true,
        employees: employees.data,
        count: employees.count
    })
})
export const getEmployeeController = expressAsyncHandler(async (req, res, next) => {
    const employee = await getEmployee(parseInt(req.params.id))
    res.status(200).json({
        status: true,
        employee
    })
})
export const removeEmployeeController = expressAsyncHandler(async (req, res, next) => {
    const removed = await removeEmployee(parseInt(req.params.id))
    if (!removed) return next({ message: "Error removing employee. Please try again", status: false })
    res.status(200).json({ status: true, message: "Employee removed successfully" })
})
export const updateEmployeeController = expressAsyncHandler(async (req, res, next) => {
    const updatedEmployee = await updateEmployee(parseInt(req.params.id), req.body)
    if (!updatedEmployee) return next({ message: "Error updating employee", status: false })
    res.status(201).json({
        status: true,
        message: "Employee updated successfully",
        employee: updatedEmployee
    })
})  