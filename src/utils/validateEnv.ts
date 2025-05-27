import { cleanEnv, port, str, num } from 'envalid'

export default cleanEnv(process.env, {
    PORT: port(),
    DB_USER: str(),
    DB_PASSWORD: str({ default: '' }) || undefined,  // Allows DB_PASSWORD to be empty
    DB_HOST: str(),
    DB_PORT: num(),
    DB_DATABASE: str(),
    GOOGLE_MAPS_API_KEY: str()
})
