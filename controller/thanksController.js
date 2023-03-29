import EventModel from "../models/eventModel.js";
import UserModel from "../models/userModel.js";

// GET - find one thanks
export const getThanks = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.token.userId);
    const eventId = user.events;
    const event = await EventModel.findById(eventId);
    const thanks = event.thanks;
    res.status(200).send(thanks);
  } catch (error) {
    next(error);
  }
};

// POST - create/ add one thanks
export const postOneThanks = async (req, res, next) => {
  try {
    console.log("req.body:", req.body);
    const user = await UserModel.findById(req.token.userId);
    const eventId = user.events;
    const response = await EventModel.findByIdAndUpdate(eventId, {
      thanks: req.body,
    });

    res.status(201).send({ approved: true, data: response });
  } catch (error) {
    next(error);
  }
};

