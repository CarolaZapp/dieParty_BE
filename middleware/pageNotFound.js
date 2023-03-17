const pageNotFound = (req, res, next) => {
  const error = new Error(" Fehler 404 - Seite nicht gefunden");
  error.statusCode = 404;
  next(error);
  res.status(404).send(error.message);
};

export default pageNotFound;
