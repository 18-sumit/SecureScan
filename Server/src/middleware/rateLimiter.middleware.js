import rateLimit from "express-rate-limit"; // for ES modules

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15minutes
    max: 10, // 100 req / window / ip
    message: {
        status: "error",
        message: "Too many requests , Please try again later."
    },
    headers: true, // rate limit header send honge
    legacyHeaders: false,
})