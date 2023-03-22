// external dependencies
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// import errorHandler
import errorHandler from "./middleware/errorHandler.js";
import pageNotFound from "./middleware/pageNotFound.js";

// import routes
import userRouter from "./routes/user.js";
import userGuestRouter from "./routes/userGuest.js";
import eventRouter from "./routes/event.js";
import invitationRouter from "./routes/invitation.js";
import thanksRouter from "./routes/thanks.js";

// connect with MongoDB
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB || "mongodb://localhost:27017";

// mongoose DB connection
mongoose.set("strictQuery", false);

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
	  })
  .then(() => console.log("mit MongoDB verbunden! 😃 "))
  .catch((err) => console.log("Verbinden mit MongoDB fehlgeschlagen. ❌", err));

// create server
const app = express();

// server middleware
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
//app.use(
//  cors({
//    origin: process.env.CLIENT || "http://localhost:3000",
//    credentials: true,
//  })
//);

// Routes anlegen
app.use("/api/user", userRouter);
app.use("/api/userGuest", userGuestRouter);
app.use("/api/event", eventRouter);
app.use("/api/invitation", invitationRouter);
app.use("/api/thanks", thanksRouter);

// 404
app.use(pageNotFound);

// Fehlerbehandlungsmiddleware
app.use(errorHandler);

// start server
app.listen(PORT, () => {
  console.log("Server läuft auf Port: " + PORT);
});
