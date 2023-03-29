import EventModel from "../models/eventModel.js";
import UserModel from "../models/userModel.js";

// GET - find one event
export const getEvent = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.token.userId);
    const eventId = user.events;
    const event = await EventModel.findById(eventId);
    res.status(200).send(event);
  } catch (error) {
    next(error);
  }
};

// POST - create/ add one event
export const postOneEvent = async (req, res, next) => {
  try {
    const newEvent = await EventModel.create(req.body);
    await UserModel.findByIdAndUpdate(req.token.userId, {
      events: newEvent._id,
    });
    res.status(201).send(newEvent);
  } catch (error) {
    next(error);
  }
};

