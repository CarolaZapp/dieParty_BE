import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

import UserModel from "../models/userModel.js";

const JWT_KEY = process.env.SECRET_JWT_KEY || "Default";
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_EMAIL= process.env.SENDGRID_EMAIL;
const HOST = process.env.HOST || "http://localhost";


// GET - find all users
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).send(allUsers);
  } catch (error) {
    next(error);
  }
};

// GET - find/  one user by ID
export const getOneUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      const error = new Error(`Ein Mitglied mit der id ${id} gibt es nicht!`);
      error.statusCode = 404;
      throw error;
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

// POST - create/ add one user
export const postOneUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const createdUser = await UserModel.create({
      ...newUser,
      password: hashedPassword,
    });
    // verify email
    sgMail.setApiKey(SENDGRID_API_KEY);
    const verifyToken = jwt.sign(
      { email: newUser.email, _id: createdUser._id },
      JWT_KEY,
      {
        expiresIn: "4h",
      }
    );
    const mailmessage = {
      to: newUser.email,
      from: SENDGRID_EMAIL, // Change to your verified sender
      subject: "Email Verifizierung",
      text: `Zur Verifizierung der email bitte auf diese Adresse gehen: ${HOST}/api/user/verify/${verifyToken}`,

      html:`
      <div> 
      <p> Hallo ${newUser.firstName}, </p>
      <p> ich freue mich über dein Interesse an meiner App <strong>dieP@rty</strong>!</p>
      <p><a href="${HOST}/api/user/verify/${verifyToken}"> Verifiziere bitte deine email per klick!"</a></p>
      <p>Liebe Grüße<br>Carola</p>
      </div>`,
    };

    const response = await sgMail.send(mailmessage);
    console.log("response von sendgrid", response);

    res.status(201).send({ approved: true, user: createdUser });
  } catch (error) {
    next(error);
  }
};


// PATCH - update / change one user by ID
export const updateOneUser = async (req, res, next) => {
  try {
    if (req.params.id !== req.token.userId) {
      const error = new Error("Nicht Authorisiert");
      error.statusCode = 401;
      throw error;
    }

    // hash password
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    // update user
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, [
      {
        new: true,
        runValidators: true,
      },
    ]).select({ password: 0 });
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

// Post login user
export const postLogin = async (req, res) => {
  try {
    const userData = req.body;
    const userFromDB = await UserModel.findOne({ email: userData.email });
    if (!userFromDB) {
      const error = new Error(
        `Kein Mitglied mit der eMail ${userData.email} vorhanden`
      );
      error.statusCode = 401;
      throw error;
    }
    const checkPassword = await bcrypt.compare(
      userData.password,
      userFromDB.password
    );
    if (!checkPassword) {
      const error = new Error("Ungültiges Passwort!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: userFromDB.email,
        userId: userFromDB._id,
      },
      JWT_KEY,
      { expiresIn: "1d" }
    );

    // res.cookie create a cookie, send to client.
    const einTag = 1000 * 60 * 60 * 24;
    res
      .cookie("loginCookie", token, {
        maxAge: einTag,
        httpOnly: true,
      })
      .send({
        auth: "eingeloggt",
        user: userFromDB,
        message: "erfolgreich",
      });
  } catch (error) {
    console.log("Login Fehler", error);
    const statusCode = error.statusCode ?? 500;
    res.status(statusCode).send(error);
  }
};

// GET Verify email
// export const getVerifyEmail = async (req, res) => {
//   try {
//     const verifyToken = req.params.token;
//     const decodedVerifyToken = jwt.verify(verifyToken, JWT_KEY);
//     const id = decodedVerifyToken._id;
//     const user = await UserModel.findByIdAndUpdate(id, { isVerified: true });
//     // D2 Seite!!!
//     // res.send({ message: "email ist verifiziert" });
//     res.redirect(`/userLoginD2`);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// GET Verify email und Antwort
export const getVerifyEmail = async (req, res) => {
  try {
    const verifyToken = req.params.token;
    const decodedVerifyToken = jwt.verify(verifyToken, JWT_KEY);
    const id = decodedVerifyToken._id;
    const user = await UserModel.findByIdAndUpdate(id, { isVerified: true });

    sgMail.setApiKey(SENDGRID_API_KEY);
    const mailmessage = {
      to: user.email,
      from: SENDGRID_EMAIL, // Change to your verified sender
      subject: "Email Verifizierung erfolgreich",
      text: `deine Email Verifizierung war erfolgreich!`,

      html:`
      <div> 
      <p> Hallo ${newUser.firstName}, </p>
      <p> deine Email Verifizierung war erfolgreich! </p>
      <p> Vielen Dank dafür und viel Spaß mit <strong>dieP@rty</strong>! </p>
      <p>Liebe Grüße<br>Carola</p>
      </div>`,
    };

    const response = await sgMail.send(mailmessage);
    console.log("response von sendgrid", response);

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};