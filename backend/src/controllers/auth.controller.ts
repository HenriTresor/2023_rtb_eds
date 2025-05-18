import prisma from "../config/prisma";
import expressAsyncHandler from 'express-async-handler'
import { createUser, deleteUser, findUserByEmail, findUserById, getAllUsers, updateUser } from "../services/auth.service";
import _ from 'lodash'
import bcrypt from 'bcrypt'
import comparePassword from "../utils/compare-password";
import generateToken from "../utils/generate-token";
import { NextFunction, Response } from "express";
import sendMail from "../utils/send-mail";

export const login = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await findUserByEmail(email)
    if (!user) return next({ message: "user not found", status: false, code: 404 })
    const isPasswordCorrect = await comparePassword(password, user.password)
    if (!isPasswordCorrect) return next({ message: "Password or email is incorrect", status: false, code: 403 })
    const token = generateToken(user.id.toString(), user.role)
    res.status(200).json({
        status: true,
        user: _.omit(user, ['password']),
        access_token: token
    })
})

export const signup = expressAsyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10)
    const userExists = await findUserByEmail(email)
    if (userExists) return next({ message: "User already exists", status: false, code: 409 })
    const newUser = await createUser({ username, email, password: hashedPassword, role: 'ADMIN' })
    if (!newUser) {
        return next(new Error("something went wrong when creating user. Please try again"))
    }

    const token = generateToken(newUser.id.toString(), newUser.role)
    const mailResponse = await sendMail(newUser.email, "Account created", "Your account has been created successfully")
    res.status(201).json(
        {
            status: true,
            message: "user created",
            user: _.omit(newUser, ['password']),
            access_token: token
        }
    )
})



export const getUser = expressAsyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { userId } = req
    if (!userId) return next({ status: false, code: 400, message: "user id is required" })
    const user = await findUserById(userId)
    if (!user) return next({ status: false, code: 404, message: "User not found" })
    res.status(200).json(
        {
            status: true, user: _.omit(user, ['password'])
        })
})


export const getAllUsersController = expressAsyncHandler(async (req, res, next) => {
    const users = await getAllUsers()
    res.status(200).json({
        status: true,
        users
    })
})

export const deleteUserController = expressAsyncHandler(async (req, res, next) => {
    const user = await deleteUser(req.params.userId)
    res.status(200).json({
        status: true,
        message: "user deleted successfully"
    })
})

export const updateUserController = expressAsyncHandler(async (req, res, next) => {
    const user = await updateUser(req.params.userId, req.body)
    res.status(200).json({
        status: true,
        user
    })
})
