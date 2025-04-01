import rateLimit from "express-rate-limit"; // for ES modules


// strict for login
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // Max 5 attempts in 10 mins
    message: "Too many login attempts, please try again later.",
});


// Moderate for register
const registerLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // Max 3 register attempts in 5 mins
    message: "Too many registration attempts, try again later.",
});

// Standard for other APIs
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per 15 mins
    message: "Too many requests, please slow down.",
});



export {
    loginLimiter,
    registerLimiter,
    apiLimiter
}