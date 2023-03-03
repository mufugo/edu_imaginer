import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

const applyMiddleware = (middleware) => (req, res) =>
  new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

const getIP = (req) =>
  req.headers["x-forwarded-for"] ||
  req.headers["x-real-ip"] ||
  req.connection.remoteAddress;

const getRateLimit = () => {
  const max = 300;
  const windowMs = 15 * 1000;  // 15 seconds
  const keyGenerator = getIP;

  return [
    slowDown({ keyGenerator, windowMs, delayMs: 1000 }),
    rateLimit({ keyGenerator, windowMs, max }),
  ];
};

const middlewares = getRateLimit();

export const applyRateLimiting = async (req, res) => {
  await Promise.all(
    middlewares.map(applyMiddleware).map((middleware) => middleware(req, res))
  );
};
