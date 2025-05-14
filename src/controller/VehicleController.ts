// vehicle controller
import { Vehicle } from "../entity/Vehicle.js";
import { Driver } from "../entity/Driver.js";
import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source.js";


export class VehicleController{
    private vehicleRepo = AppDataSource.getRepository(Vehicle);
    private driverRepo = AppDataSource.getRepository(Driver);


    // Create or update vehicle for a driver
    async registerOrUpdateVehicle(req: Request, res: Response, _next: NextFunction) {
        const { driverId, vehicleModel, licensePlate, color } = req.body;

        try {
            const driver = await this.driverRepo.findOneBy({ id: driverId });
            if (!driver) {
                return res.status(404).json({ message: "Driver not found" });
            }

            let vehicle = await this.vehicleRepo.findOne({ where: { driver: { id: driverId } } });

            if (vehicle) {
                // Update existing vehicle
                vehicle.vehicleModel = vehicleModel;
                vehicle.licensePlate = licensePlate;
                vehicle.color = color;
            } else {
                // Create new vehicle
                vehicle = this.vehicleRepo.create({
                    driver,
                    vehicleModel,
                    licensePlate,
                    color,
                });
            }

            await this.vehicleRepo.save(vehicle);

            return res.status(200).json({ message: "Vehicle registered/updated", vehicle });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    }


    // Get a driver's vehicle
    async getVehicleByDriver(req: Request, res: Response) {
        const { driverId } = req.params;

        try {
            const vehicle = await this.vehicleRepo.findOne({
                where: { driver: { id: driverId } },
                relations: ["driver"],
            });

            if (!vehicle) {
                return res.status(404).json({ message: "Vehicle not found for driver" });
            }

            return res.status(200).json({ vehicle });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    }







}