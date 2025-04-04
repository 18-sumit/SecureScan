import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "../src/utils/logger.js";
import morgan from "morgan";
import helmet from "helmet";
// import { rateLimiter } from "./middleware/rateLimiter.middleware.js";


const app = express();

// app.use("/api", rateLimiter);

// helmet.js to set security-related HTTP headers
app.use(helmet());


// custom CSP - content security policy
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [" 'self'"], // allow only-same origin resources
            // scriptSrc: ["'self'", "'unsafe-inline'"], // allow inline scripts
            objectSrc: ["'none'"], // disable object embeds 
            upgradeInsecureRequests: [] // upgrades HTTP req  to => HTTPS
        }
    })
);

app.use(helmet.hsts({
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
}))

app.use(helmet.xssFilter()); // prevent XSS attacks by enabling XSS filter in browser.

app.use(helmet.noSniff()); // prevent MIME sniffing : stops brower from assuming the format of files in the header if not mentioned

app.use(helmet.referrerPolicy({
    policy: 'strict-origin-when-cross-origin'
}));

app.use(helmet.frameguard({
    action: 'deny'
}));




app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
));




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

//ROUTES:
import { userRouter } from "./routes/user.routes.js";
import { securityRouter } from "./routes/security.routes.js";
import { analyzeRouter } from "./routes/website.routes.js";



app.use("/api/v1/user", userRouter);
app.use("/api/v1/security", securityRouter);
app.use("/api/v1/website", analyzeRouter)




export { app }