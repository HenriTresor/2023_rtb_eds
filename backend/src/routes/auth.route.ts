import { Router } from "express";
import { deleteUserController, getAllUsersController, getUser, login, signup, updateUserController } from "../controllers/auth.controller";
import { loginValidator, signupValidator } from "../validators/auth.validator";
import validate from "../middlewares/validator";
import verifyToken from "../middlewares/verify-token";

const router = Router()


router.post('/login', loginValidator, validate, login)
router.post('/signup', signupValidator, validate, signup)
router.get('/user', verifyToken, getUser)
router.put('/:id', verifyToken, updateUserController)
router.delete('/:id', verifyToken, deleteUserController)
router.get('/', verifyToken, getAllUsersController)

export default router 