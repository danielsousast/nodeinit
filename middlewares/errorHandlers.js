const notFoundHandler = (req, res) => {
  return res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: req.t("pageNotFound"),
    },
  });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (res.headersSent) {
    return next(err);
  }

  return res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_ERROR",
      message,
    },
  });
};

module.exports = { notFoundHandler, errorHandler };
