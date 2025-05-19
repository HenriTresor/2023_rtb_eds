import { Router } from "express";
import {
    deleteUserController,
    getAllUsersController,
    getUser,
    login,
    signup,
    updateUserController,
} from "../controllers/auth.controller";
import { loginValidator, signupValidator } from "../validators/auth.validator";
import validate from "../middlewares/validator";
import verifyToken from "../middlewares/verify-token";

const router = Router();

/**
 * @swagger
 * tags:
 *    name: Auth 
 *    description: Authentication endpoints 
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: login
 *     tags: [Auth]
 *     description: login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: user email 
 *               password:
 *                 type: string
 *                 description: user password
 *     responses:
 *       200:
 *         description: user found and logged in
 *       400:
 *         description: User request invalid.
 *       500:
 *         description: Inter server error.
 */
router.post('/login', loginValidator, validate, login);

/**
 * @swagger
 * /api/v1/auth/signup:
 *  post:
 *      summary: sign up
 *      tags: [Auth]  
 *      description: create new account
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                          - username
 *                      properties:
 *                          email:
 *                               type: string
 *                               description: new user email
 *                          password: 
 *                               type: string
 *                               description: new user password
 *                          username:
 *                               type: string
 *                               description: user names
 *      responses:
 *           201:
 *             description: user created
 *           400: 
 *             description: bad request
 *           500:
 *             description: internal server error
 */
router.post('/signup', signupValidator, validate, signup);

/**
 * @swagger
 * /api/v1/auth/user:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     description: Fetch the currently authenticated user's data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get('/user', verifyToken, getUser);

/**
 * @swagger
 * /api/v1/auth/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Auth]
 *     description: Update user information (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifyToken, updateUserController);

/**
 * @swagger
 * /api/v1/auth/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Auth]
 *     description: Delete a user (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifyToken, deleteUserController);

/**
 * @swagger
 * /api/v1/auth/:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     description: Retrieve a list of all users (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyToken, getAllUsersController);

export default router;
