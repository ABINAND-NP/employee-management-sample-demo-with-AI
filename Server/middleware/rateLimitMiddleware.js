import rateLimit from "express-rate-limit";

const rateLimitMiddleware = rateLimit({
    windowMs: 60 * 1000, // 1 minute

    limit: 10, // maximum 10 requests

    message: {
        message: "Too many requests. Please try again later."
    },

    standardHeaders: true,
    legacyHeaders: false
});

export default rateLimitMiddleware;