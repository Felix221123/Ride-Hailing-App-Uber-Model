import 'dotenv/config'
import express from "express"
import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "./data-source.ts"
import { Routes } from "./routes.ts"
import config from './config/config.ts'

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(express.json())


    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: NextFunction) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // defining the port
    const port = config.server.port

    // using the listen callback func to log out port definition
    app.listen(port, () => {
        console.log(`app is running at http://localhost:${port}`)
    })

    
}).catch(error => console.log(error))
