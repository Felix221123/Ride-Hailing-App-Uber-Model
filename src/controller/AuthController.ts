// auth controller
import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source.ts"
import { Customer } from "../entity/Customer.ts"
import { Admin } from "../entity/Admin.ts"
import { Driver } from "../entity/Driver.ts"
import { User } from "../entity/User.ts"
import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"


export class AuthController {

    // static method to register a new user
    async register(_request: Request, _response: Response, _next: NextFunction) {
        const {firstName, lastName, email, password, role } = _request.body

        try {
            // getting the user repository
            const userRepo = AppDataSource.getRepository(User);
            const existingUser = await userRepo.findOne({ where: { emailAddress: email } });

            // check if user already exists
            if (existingUser){
                return _response.status(400).json({ message: "User already exists with this email address" });
            }

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            let newUser; 

            // create a new user role using the switch statement
            switch (role) {
                case "customer":
                    newUser = new Customer();
                    break;
                case "admin":
                    newUser = new Admin();
                    break;
                case "driver":
                    newUser = new Driver();
                    break;
                default:
                    return _response.status(400).json({ message: "Invalid role specified" });
            }

            // set the user properties
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.emailAddress = email;
            newUser.password = hashedPassword;
            newUser.role = role;
            newUser.status = "active";

            // save the new user
            const savedUser = await userRepo.save(newUser);
            return _response.status(201).json({ message: "User registered successfully", user: savedUser });


        } catch (error) {
            return _response.status(500).json({ message: "Internal server error", error });
        }

    }








}
