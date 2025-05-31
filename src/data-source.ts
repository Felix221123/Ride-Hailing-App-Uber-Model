import "reflect-metadata"
import { DataSource } from "typeorm"
import config from "./config/config.js"
import { User } from "./entity/User.js"
import { Admin } from "./entity/Admin.js"
import { Driver } from "./entity/Driver.js"
import { Customer } from "./entity/Customer.js"
import { Ride } from "./entity/Ride.js"
import { Payment } from "./entity/Payment.js"
import { Vehicle } from "./entity/Vehicle.js"




export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.server.databaseConfig.host,
    port: config.server.databaseConfig.port,
    username: config.server.databaseConfig.user,
    password: config.server.databaseConfig.password,
    database: config.server.databaseConfig.database,
    synchronize: false,
    logging: false,
    entities: [User , Admin , Driver , Customer , Ride , Payment , Vehicle],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false, 
    },
});


