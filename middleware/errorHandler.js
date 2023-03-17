const errorHandler = (err, req, res, next) => {
  // output console
  console.log("error name", err.name);
  console.log("error message", err.message);
  console.log("error status code", err.statusCode);

  // output response
  const statusCode = err.statusCode ?? 500;
  res
    .status(statusCode)
    .send({ error: { status: statusCode, message: err.message } });
};

export default errorHandler;
