export const memoryGuard = (req, res, next) => {
  const memoryUsage = process.memoryUsage();
  const heapUsedMB = memoryUsage.heapUsed / 1024 / 1024;
  const heapTotalMB = memoryUsage.heapTotal / 1024 / 1024;

  const usagePercent = (heapUsedMB / heapTotalMB) * 100;

  if (usagePercent > 80) {
    return res.status(503).json({
      success: false,
      message: "Server under heavy memory load. Try later.",
    });
  }

  next();
};
