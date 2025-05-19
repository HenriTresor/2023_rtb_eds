import prisma from "../config/prisma";
import { Vehicle } from "../types";

export const addVehicle = async (vehicle: Vehicle) => {
    const owner = await prisma.user.findFirst({ where: { id: vehicle.ownerId } })
    if (!owner) return { status: false, code: 404, message: "Owner is not registered" }
    const newVehicle = await prisma.vehicle.create({ data: vehicle })
    return newVehicle
}
export const removeVehicle = async (vehicleId: number) => await prisma.vehicle.delete({ where: { id: vehicleId } })
export const getVehicles = async () => await prisma.vehicle.findMany()
export const getVehicle = async (vehicleId: number) => await prisma.vehicle.findFirst({ where: { id: vehicleId } })
export const updateVehicle = async (vehicleId: number, vehicle: Vehicle) => {
    const vehicleExists = await prisma.vehicle.findFirst({ where: { id: vehicleId } })
    if (!vehicleExists) return false
    return await prisma.vehicle.update({ where: { id: vehicleExists.id }, data: vehicle })
}