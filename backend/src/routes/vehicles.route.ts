import { Router } from "express";
import {
    createVehicleController,
    deleteVehicleController,
    getVehicleController,
    getVehiclesController,
    updateVehicleController,
} from "../controllers/vehicle.controller";
import { vehicleValidator } from "../validators/vehicle.validator";
import validate from "../middlewares/validator";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle management endpoints
 */

/**
 * @swagger
 * /api/v1/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: List of vehicles
 *       500:
 *         description: Internal server error
 */
router.get('/', getVehiclesController);

/**
 * @swagger
 * /api/v1/vehicles/{vehicleId}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - name: vehicleId
 *         in: path
 *         required: true
 *         description: ID of the vehicle
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle found
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.get('/:vehicleId', getVehicleController);

/**
 * @swagger
 * /api/v1/vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plate_no
 *               - ownerId
 *             properties:
 *               plate_no:
 *                 type: string
 *               ownerId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Vehicle created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post('/', vehicleValidator, validate, createVehicleController);

/**
 * @swagger
 * /api/v1/vehicles/{vehicleId}:
 *   put:
 *     summary: Update a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - name: vehicleId
 *         in: path
 *         required: true
 *         description: ID of the vehicle to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plate_no
 *               - ownerId
 *             properties:
 *               plate_no:
 *                 type: string
 *               ownerId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Vehicle updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.put('/:vehicleId', vehicleValidator, validate, updateVehicleController);

/**
 * @swagger
 * /api/v1/vehicles/{vehicleId}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - name: vehicleId
 *         in: path
 *         required: true
 *         description: ID of the vehicle to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle deleted
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:vehicleId', deleteVehicleController);

export default router;
