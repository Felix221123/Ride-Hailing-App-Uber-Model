import { Customer } from './../entity/Customer.js';
import { AppDataSource } from "../data-source.js"
import { NextFunction, Request, Response } from "express"

export class CustomerController {

    // variable to access the users/customers repository
    private userRepository = AppDataSource.getRepository(Customer)

    // method to get all customers
    async all_customers(_request: Request, _response: Response, _next: NextFunction) {
        return this.userRepository.find()
    }

    // method for customers to request rides
    async requestRide(_request: Request, _response: Response, _next: NextFunction){}

}