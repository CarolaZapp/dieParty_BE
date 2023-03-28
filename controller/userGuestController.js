import UserModel from "../models/userModel.js";
import EventModel from "../models/eventModel.js";
import * as dotenv from "dotenv";
dotenv.config();
import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_EMAIL= process.env.SENDGRID_EMAIL;
const HOST = process.env.HOST || "http://localhost";

// GET - find all users guest
export const getAllUserGuests = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.token.userId);
    const eventId = user.events;
    const event = await EventModel.findById(eventId);
    const allUserGuests = event.userGuest;
    res.status(200).send(allUserGuests);
  } catch (error) {
    next(error);
  }
};

// POST - create/ add one user guest
export const postOneUserGuest = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.token.userId);
    const eventId = user.events;
    const response = await EventModel.findByIdAndUpdate(
      eventId,
      {
        $push: {
          userGuest: req.body,
        },
      },
      { new: true }
    );

    const newUserGuest = response.userGuest[response.userGuest.length - 1];

    const userGuestId = newUserGuest._id;
    sgMail.setApiKey(SENDGRID_API_KEY);
    const mailmessage = {
      to: newUserGuest.email,
      from: SENDGRID_EMAIL,
      subject: "Einladung",
      text: `Zur Einladung bitte auf diese Adresse gehen:${HOST}/invitationUser/${eventId}/${userGuestId}`,
      html: `<p><a href="${HOST}/invitationUser/${eventId}/${userGuestId}">"Hallo ${newUserGuest.firstName}, hier geht es zu deiner Einladung zum Event ...  "</a> viel Freude damit ... </p>`,
    };
    // oder doch nicht?
    const respo = await sgMail.send(mailmessage);
    console.log("response von sendgrid", respo);
    //
    res.status(201).send({ approved: true });
  } catch (error) {
    next(error);
  }
};

// PATCH - update / change one user guest
export const updateOneUserGuest = async (req, res, next) => {
  try {
    const { formData, eventId, userGuestId } = req.body;
    console.log({ eventId });
    console.log({ userGuestId });
    const response = await EventModel.findOneAndUpdate(
      {
        _id: eventId,
        "userGuest._id": userGuestId,
      },
      {
        $set: {
          "userGuest.$.join": formData.join,
          "userGuest.$.adults": formData.adults,
          "userGuest.$.kids": formData.kids,
          "userGuest.$.arrival": formData.arrival,
          "userGuest.$.departure": formData.departure,
          "userGuest.$.lodging": formData.lodging,
          "userGuest.$.kindlodging": formData.kindlodging,
          "userGuest.$.vegetarian": formData.vegetarian,
          "userGuest.$.vegan": formData.vegan,
          "userGuest.$.comment": formData.comment,
        },
      },
      { new: true }
    );
    res.status(201).send({ approved: true, data: response });
  } catch (error) {
    next(error);
  }
};
