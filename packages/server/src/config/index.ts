import { config } from "dotenv";
config()

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    db: {
        development: {
            type: process.env.DEVELOPMENT_DB_TYPE,
            port: process.env.DEVELOPMENT_DB_PORT,
            host: process.env.DEVELOPMENT_DB_HOST,
            userName: process.env.DEVELOPMENT_DB_USERNAME,
            dbName: process.env.DEVELOPMENT_DB_DATABASE,
            password: process.env.DEVELOPMENT_DB_PASSWORD,
            sync: process.env.DEVELOPMENT_DB_SYNCHRONIZE,
            logging: process.env.DEVELOPMENT_DB_LOGGING
        },
        production: {}
    },
    token: {
        secret: process.env.SECRET_JWT || "",
    },
    apiScrapping: {
        funcionarios: process.env.API_FUNCIONARIOS || "",
        sanctions: {
            url: process.env.API_SANCTIONS || "",
            viewState: process.env.VIEWSTATE_SANCTIONS || ""
        }
    },
    google: {
        url: process.env.API_GOOGLE,
        apiKey: process.env.API_KEY_GOOGLE,
        cx: process.env.CX_GOOGLE
    },
    onu: {
        urlBlackList: process.env.ONU_BLACKLIST || ""
    }
}