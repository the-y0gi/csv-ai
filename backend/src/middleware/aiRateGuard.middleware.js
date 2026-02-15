const ipTracker = new Map();

const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 1000;

export const aiRateGuard = (req, res, next) => {
  const ip = req.ip;

  const now = Date.now();

  if (!ipTracker.has(ip)) {
    ipTracker.set(ip, {
      count: 1,
      startTime: now,
    });
    return next();
  }

  const record = ipTracker.get(ip);

  if (now - record.startTime > WINDOW_MS) {
    ipTracker.set(ip, {
      count: 1,
      startTime: now,
    });
    return next();
  }

  if (record.count >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many AI requests. Try again later.",
    });
  }

  record.count++;
  next();
};
