import { Driver } from "./../entity/Driver.js";
import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express"
import { Ride } from "./../entity/Ride.js";
import { Payment } from "./../entity/Payment.js";
import { Customer } from "./../entity/Customer.js";

export class DriverController {

    // variable to access the driver & ride & payment repository
    private driverRepository = AppDataSource.getRepository(Driver);
    private rideRepository = AppDataSource.getRepository(Ride);
    private paymentRepository = AppDataSource.getRepository(Payment);

    // method to get all drivers
    async all_drivers(_request: Request, _response: Response, _next: NextFunction) {
        return this.driverRepository.find()
    }

    // methods to view all pending request from rides
    async all_pending_requests(_request: Request, _response: Response, _next: NextFunction) {
        try {
            const rides = await this.rideRepository.find({
                where: { status: "pending" },
                relations: ["customer"]
            });

            return _response.status(200).json({ pendingRides: rides });

        } catch (error) {

            return _response.status(500).json({ message: "Internal server error", error });
        }
    }


    // method to accept a ride request
    async acceptRide(req: Request, res: Response, _next: NextFunction) {
        const { rideId, driverId } = req.body;

        try {
            const ride = await this.rideRepository.findOne({
                where: { id: rideId },
                relations: ["driver"]
            });

            // check if the ride exists
            if (!ride) return res.status(404).json({ message: "Ride not found" });

            // check if the ride is available for acceptance
            if (ride.status !== "pending") {
                return res.status(400).json({ message: "Ride is not available for acceptance" });
            }

            // check if the driver exists
            const driver = await this.driverRepository.findOneBy({ id: driverId });
            if (!driver) return res.status(404).json({ message: "Driver not found" });

            // assign the driver to the ride
            ride.driver = driver;
            ride.status = "accepted";

            // save the updated ride
            await this.rideRepository.save(ride);

            return res.status(200).json({ message: "Ride accepted successfully", ride });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    }


    // method to start ride
    async startRide(req: Request, res: Response) {
        const { rideId, driverId } = req.body;
    
        try {
            const ride = await this.rideRepository.findOne({
                where: { id: rideId },
                relations: ["driver"]
            });
    
            if (!ride) return res.status(404).json({ message: "Ride not found" });
    
            if (!ride.driver || ride.driver.id !== driverId) {
                return res.status(403).json({ message: "You are not assigned to this ride" });
            }
    
            if (ride.status !== "accepted") {
                return res.status(400).json({ message: "Ride is not in accepted state" });
            }
    
            ride.status = "ongoing";
            await this.rideRepository.save(ride);
    
            return res.status(200).json({ message: "Ride started", ride });
        } catch (err) {
            return res.status(500).json({ message: "Internal server error", error: err });
        }
    }
    



    // method to complete a ride
    async completeRide(req: Request, res: Response, _next: NextFunction) {
        const { rideId, driverId } = req.body;

        try {
            // Find the ride
            const ride = await this.rideRepository.findOne({
                where: { id: rideId },
                relations: ["customer", "driver"]
            });

            // Check if the ride exists and if the driver is assigned to it
            if (!ride) return res.status(404).json({ message: "Ride not found" });
            if (!ride.driver || ride.driver.id !== driverId)
                return res.status(403).json({ message: "You are not assigned to this ride" });

            // Check if the ride is ongoing
            if (ride.status !== "ongoing")
                return res.status(400).json({ message: "Ride is not ongoing" });

            // Mark as completed
            ride.status = "completed";
            ride.completedAt = new Date();
            await this.rideRepository.save(ride);

            // Create payment record
            const payment = this.paymentRepository.create({
                customer: ride.customer,
                ride,
                amount: ride.fare,
                paymentMethod: (ride.customer as Customer).paymentMethod,
                refundStatus: "none"
            });
            await this.paymentRepository.save(payment);

            // Update driver earnings
            const driver = await this.driverRepository.findOneBy({ id: driverId });
            if (driver) {
                driver.totalEarnings += ride.fare;
                driver.rideHistory = [...(driver.rideHistory || []), {
                    rideId: ride.id,
                    date: ride.completedAt.toISOString(),
                    price: ride.fare
                }];
                await this.driverRepository.save(driver);
            }

            // Update customer ride history (optional)
            const customer = ride.customer as any;
            customer.rideHistory = [...(customer.rideHistory || []), {
                rideId: ride.id,
                date: ride.completedAt.toISOString(),
                price: ride.fare
            }];


            await AppDataSource.getRepository(customer.constructor.name).save(customer);

            return res.status(200).json({ message: "Ride completed and payment processed", ride, payment });
        } catch (err) {
            return res.status(500).json({ message: "Internal server error", error: err });
        }
    }


}