import expressAsyncHandler from "express-async-handler";
import { addVehicle, getVehicle, getVehicles, removeVehicle, updateVehicle } from "../services/vehicle.service";
import { Vehicle } from "../types";

export const getVehiclesController = expressAsyncHandler(async (req, res, next) => {
    const vehicles = await getVehicles()
    res.status(200).json({
        status: true,
        vehicles
    })
})

export const getVehicleController = expressAsyncHandler(async (req, res, next) => {
    const vehicle = await getVehicle(parseInt(req.params.vehicleId))
    if (!vehicle) return next({ status: false, code: 404, message: "Vehicle does not exist" })
    res.status(200).json({
        status: true,
        vehicle
    })
})

export const createVehicleController = expressAsyncHandler(async (req, res, next) => {
    const newVehicle = await addVehicle(req.body)
    // if (!(newVehicle.id as Vehicle['id'])) return next(newVehicle)
    res.status(201).json({
        status: true,
        vehicle: newVehicle
    })
}) 

export const deleteVehicleController = expressAsyncHandler(async (req, res, next) => {
    const vehicle = await removeVehicle(parseInt(req.params.vehicleId))
    res.status(200).json({
        status: true,
        message: "vehicle deleted successfully"
    })
})

export const updateVehicleController = expressAsyncHandler(async (req, res, next) => {
    const vehicle = await updateVehicle(parseInt(req.params.vehicleId), req.body)
    res.status(200).json({
        status: true,
        vehicle
    })
})