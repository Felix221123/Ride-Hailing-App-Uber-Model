import { Driver } from "./../entity/Driver.js";
import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express"



export class DriverController {

    // variable to access the driver repository
    private driverRepository = AppDataSource.getRepository(Driver)

    // method to get all drivers
    async all_drivers(_request: Request, _response: Response, _next: NextFunction) {
        return this.driverRepository.find()
    }
}