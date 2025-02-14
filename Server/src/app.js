import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "../src/utils/logger.js";
import morgan from "morgan";
import helmet from "helmet";

const app = express();


// helmet.js to set security-related HTTP headers
app.use(helmet());


// custom CSP - content security policy
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            // defaultSrc: [" 'self'"], // allow only-same origin resources
            // scriptSrc: ["'self'", "'unsafe-inline'"], // allow inline scripts
            objectSrc: ["'none'"], // disable object embeds 
            upgradeInsecureRequests: [] // upgrades HTTP req  to => HTTPS
        }
    })
);

app.use(helmet.xssFilter()); // prevent XSS attacks by enabling XSS filter in browser.



app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
))

app.use(express.json({
    limit: "16kb"
}
))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(cookieParser())

// MORGAN:

const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);


import { userRouter } from "./routes/user.routes.js";
app.use("/api/v1/user", userRouter);





export { app }