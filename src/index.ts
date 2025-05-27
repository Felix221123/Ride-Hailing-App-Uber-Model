import 'dotenv/config'
import express from "express"
import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "./data-source.js"
import { Routes } from "./routes.js"
import config from './config/config.js'

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(express.json())


    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const controllerInstance = new (route.controller as any)();
                const result = await controllerInstance[route.action](req, res, next);

                // Only send a response if the controller doesn't handle it
                if (result !== undefined && result !== null && !res.headersSent) {
                    res.json(result);
                }
            } catch (error) {
                console.error("Error processing request:", error);
                const err = error as Error; // Type assertion
                console.error("Error processing request:", err.message);
                if (!res.headersSent) {
                    res.status(500).json({ message: "Internal server error", error: err.message });
                }
            }
        });
    });



    // setup express app here
    // ...

    // defining the port
    const port = config.server.port || 5500

    // using the listen callback func to log out port definition
    app.listen(port, () => {
        console.log(`app is running at http://localhost:${port}`)
    })


}).catch(error => console.log(error))
