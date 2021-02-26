import * as dotenv from "dotenv";

dotenv.config();

interface AppConfig {
    db: {
        user: string,
        host: string,
        database: string,
        password: string,
        port: number,
    },
    cors: {
        origin: string,
        methods: string,
        headers: string,
    },
}

export const config: AppConfig = {
    db: {
        user: process.env.DB_USER || '',
        host: process.env.DB_HOST || '',
        database: process.env.DB_DATABASE || '',
        password: process.env.DB_PASSWORD || '',
        port: +process.env.DB_PORT || 0,
    },
    cors: {
        origin: '*',
        methods: 'GET,POST,DELETE',
        headers: 'Origin, User-Agent, Cache-Control, Content-Type, Accept'
    }
}
