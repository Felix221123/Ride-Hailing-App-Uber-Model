import { Customer } from './../entity/Customer.js';
import { AppDataSource } from "../data-source.js"
import { NextFunction, Request, Response } from "express"
import { Ride } from './../entity/Ride.js';
import { getDistanceAndTime } from '../utils/maps.js';




export class CustomerController {

    // variable to access the users/customers repository
    private userRepository = AppDataSource.getRepository(Customer)
    private rideRepository = AppDataSource.getRepository(Ride)

    // method to get all customers
    async all_customers(_request: Request, _response: Response, _next: NextFunction) {
        return this.userRepository.find()
    }

    // method for customers to request rides
    async requestRide(_request: Request, _response: Response, _next: NextFunction){
        const { customerId , pickupLocation , destination } = _request.body;

        try {
            const customer = await this.userRepository.findOneBy({ id: customerId });
            if (!customer) return _response.status(404).json({ message: "Customer not found" });

            const { distance, estimatedTime } = await getDistanceAndTime(pickupLocation, destination);

            console.log(distance,estimatedTime , " is the distance and time for rides");

            // Estimate fare (e.g., £2/km)
            const baseFarePerKm = 2;
            const surgeMultiplier = 1.0;
            const fare = baseFarePerKm * distance * surgeMultiplier;


            const ride = this.rideRepository.create({
                customer,
                pickupLocation,
                destination,
                status: "pending", // <-- pending instead of assigned
                fare,
                distance,
                estimatedTime,
                surgeMultiplier,
            });

            // save the ride in the database
            await this.rideRepository.save(ride);

            // return the created ride
            return _response.status(201).json({ message: "Ride requested successfully", ride });

        } catch (error) {
            return _response.status(500).json({ message: "Internal server error", error });
        }
    }

}