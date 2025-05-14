// auth controller
import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source.js"
import { Customer } from "../entity/Customer.js"
import { Admin } from "../entity/Admin.js"
import { Driver } from "../entity/Driver.js"
import { User } from "../entity/User.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';


export class AuthController {

    // static method to register a new user
    async register(_request: Request, _response: Response, _next: NextFunction) {
        const { firstName, lastName, email, password, role } = _request.body

        try {
            // getting the user repository
            const userRepo = AppDataSource.getRepository(User);
            const existingUser = await userRepo.findOne({ where: { emailAddress: email } });

            // check if user already exists
            if (existingUser) {
                return _response.status(400).json({ message: "User already exists with this email address" });
            }

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

        
            // create a new user role using the switch statement
            switch (role) {
                case "customer": {
                    const customer = new Customer();
                    customer.firstName = firstName;
                    customer.lastName = lastName;
                    customer.emailAddress = email;
                    customer.password = hashedPassword;
                    customer.role = role;
                    customer.status = "active";
                    customer.paymentMethod = "card";
                    customer.rideHistory = [];
            
                    const savedCustomer = await AppDataSource.getRepository(Customer).save(customer);
                    return _response.status(201).json({ message: "User registered successfully", user: savedCustomer });
                }
            
                case "driver": {
                    const driver = new Driver();
                    driver.firstName = firstName;
                    driver.lastName = lastName;
                    driver.emailAddress = email;
                    driver.password = hashedPassword;
                    driver.role = role;
                    driver.status = "active";
                    driver.isAvailable = true;
                    driver.location = "unknown";
                    driver.totalEarnings = 0;
                    driver.rideHistory = [];
            
                    const savedDriver = await AppDataSource.getRepository(Driver).save(driver);
                    return _response.status(201).json({ message: "User registered successfully", user: savedDriver });
                }
            
                case "admin": {
                    const admin = new Admin();
                    admin.firstName = firstName;
                    admin.lastName = lastName;
                    admin.emailAddress = email;
                    admin.password = hashedPassword;
                    admin.role = role;
                    admin.status = "active";
                    admin.permissions = [];
            
                    const savedAdmin = await AppDataSource.getRepository(Admin).save(admin);
                    return _response.status(201).json({ message: "User registered successfully", user: savedAdmin });
                }
            
                default:
                    return _response.status(400).json({ message: "Invalid role specified" });
            }

        } catch (error) {
            return _response.status(500).json({ message: "Internal server error", error });
        }
    }

    // static method to login a user
    async login(_request: Request, _response: Response, _next: NextFunction) {
        const { email, password } = _request.body;

        try {
            // getting the user repository
            const userRepo = AppDataSource.getRepository(User);
            const existingUser = await userRepo.findOne({ where: { emailAddress: email } });

            // check if user exists
            if (!existingUser) {
                return _response.status(404).json({ message: "User not found" });
            }

            // check if password is correct
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordValid) {
                return _response.status(401).json({ message: "Invalid credentials" });
            }

            // create a session token
            const sessionToken = uuidv4();

            // update the user session token
            existingUser.sessionToken = sessionToken;

            return _response.status(200).json({ message: "User logged in successfully", user: existingUser });
        } catch (error) {
            return _response.status(500).json({ message: "Internal server error", error });
        }
    }

}
