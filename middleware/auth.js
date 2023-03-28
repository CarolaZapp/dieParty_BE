import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

// JSON-Web-Token
const JWT_KEY = process.env.SECRET_JWT_KEY || "Default";

// authentification user - logged in
const auth = (req, res, next) => {
  try {
    const token = req.cookies.loginCookie;
    // console.log(token);
    const decodedToken = jwt.verify(token, JWT_KEY);
    console.log("User ist verifiziert, Daten werden an den Client gesendet");
    req.token = decodedToken;
    next();
  } catch (error) {
    const errObj = new Error("Nicht angemeldet", { cause: error });
    errObj.statusCode = 401;
    next(errObj);
  }
};

export default auth;
