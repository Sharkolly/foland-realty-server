import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true, // ✅ Return rate limit info in headers
  legacyHeaders: false,  // ❌ Disable old `X-RateLimit-*` headers
});
export default limiter;