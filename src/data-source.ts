import "reflect-metadata"
import { DataSource } from "typeorm"
import config from "./config/config.ts"
import { User } from "./entity/User.ts"
import { Admin } from "./entity/Admin.ts"
import { Driver } from "./entity/Driver.ts"
import { Customer } from "./entity/Customer.ts"
import { Ride } from "./entity/Ride.ts"
import { Payment } from "./entity/Payment.ts"
import { Vehicle } from "./entity/Vehicle.ts"




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
});


