import prisma from "../config/prisma";
import { Employee } from "../types";

export const createEmployee = async (employee: Employee) => {
    return prisma.employee.create({ data: employee })
}
export const getEmployees = async (
    page: number = 1,
    pageSize: number = 10
) => {
    return {
        data: await prisma.employee.findMany({
            skip: (page - 1) * pageSize || 0,
            take: pageSize || 10,
            orderBy: {
                createdAt: 'desc'
            }
        }),
        count: await prisma.employee.count()
    }
};

export const getEmployee = async (id: number) => {
    return prisma.employee.findFirst({ where: { id } })
}

export const removeEmployee = async (id: number) => {
    const employee = prisma.employee.delete({ where: { id } })
    return employee
}

export const updateEmployee = async (id: number, employee: Employee) => {
    return prisma.employee.update({ where: { id }, data: employee })
}

