let activeProcesses = 0;
const MAX_CONCURRENT = 10;

export const concurrencyGuard = (req, res, next) => {
  if (activeProcesses >= MAX_CONCURRENT) {
    return res.status(503).json({
      success: false,
      message: "Server busy. Try again later.",
    });
  }

  activeProcesses++;

  res.on("finish", () => {
    activeProcesses--;
  });

  next();
};
