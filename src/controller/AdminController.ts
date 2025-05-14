import { Admin } from "./../entity/Admin.js";
import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express"


export class AdminController {

    // getting the admin repository
    private adminRepository = AppDataSource.getRepository(Admin)

    // method to get all admins
    async all_admins(_request: Request, _response: Response, _next: NextFunction) {
        return this.adminRepository.find()
    }
}