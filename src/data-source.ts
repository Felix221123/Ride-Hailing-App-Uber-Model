import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import config from "./config/config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.server.databaseConfig.host,
    port: config.server.databaseConfig.port,
    username: config.server.databaseConfig.user,
    password: config.server.databaseConfig.password,
    database: config.server.databaseConfig.database,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
