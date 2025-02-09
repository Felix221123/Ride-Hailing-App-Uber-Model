import 'dotenv/config'
import express from "express"
import * as bodyParser from "body-parser"
import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "./data-source.ts"
import { Routes } from "./routes.ts"
import config from './config/config.ts'

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

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

    console.log("Express server has started on port 5500. Open http://localhost:5500/users to see results")

}).catch(error => console.log(error))
