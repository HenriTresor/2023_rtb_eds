import prisma from "../config/prisma";
import { User } from "../types";

export const createUser = async (user: User) => {
    const newUser = await prisma.user.create({ data: user })
    return newUser
}

export const findUserByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({ where: { email } })
    return user
}

export const findUserById = async (userId: string) => {
    const user = await prisma.user.findFirst({ where: { id: parseInt(userId) } })
    return user
}

export const deleteUser = async (userId: string) => {
    const user = await prisma.user.delete({ where: { id: parseInt(userId) } })
}

export const getAllUsers = async () => {
    return await prisma.user.findMany()
}

export const updateUser = async (userId: string, user: User) => {
    return await prisma.user.update({ where: { id: parseInt(userId) }, data: user })
}