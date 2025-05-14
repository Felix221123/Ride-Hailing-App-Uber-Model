import 'dotenv/config'
import env from "../utils/validateEnv.js"


// defining env variables here
const SERVER_PORT = env.PORT;
const DATABASE_USER = env.DB_USER;
const DATABASE_PASSWORD = env.DB_PASSWORD;
const DATABASE_HOST = env.DB_HOST;
const DATABASE_PORT = env.DB_PORT;
const DATABASE_NAME = env.DB_DATABASE;


// defining the server
const SERVER = {
    port: SERVER_PORT,
    databaseConfig: {
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        database: DATABASE_NAME
    }
};


// put the server in a config object and exporting it
const config = {
    server: SERVER
};


export default config

