export const responseTime = (req, res, next) => {
  const start = Date.now();

  const originalEnd = res.end;

  res.end = function (...args) {
    const duration = Date.now() - start;
    res.setHeader("X-Response-Time", `${duration}ms`);
    originalEnd.apply(this, args);
  };

  next();
};
