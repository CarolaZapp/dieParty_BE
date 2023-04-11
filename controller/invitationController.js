import EventModel from "../models/eventModel.js";
import UserModel from "../models/userModel.js";

// GET - find one invitation
export const getInvitation = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.token.userId);
    const eventId = user.events;
console.log("getInvitation eventId:", eventId);
    const event = await EventModel.findById(eventId);
console.log("getInvitation event:", event);
    const invitation = event.invitation;
console.log("getInvitation invitation:",invitation);
    res.status(200).send(invitation);
  } catch (error) {
    next(error);
  }
};

// GET - find one invitation
// export const getInvitation = async (req, res, next) => {
//   try {
//     const event = await EventModel.findById(req.params.id); // ???? warum funktioniert das nicht!
// console.log("getInvitation event:", event);
//     const invitation = event.invitation;
//     res.status(200).send(invitation);
//   } catch (error) {
//     next(error);
//   }
// };

// GET - find user invitation
export const getUserInvitation = async (req, res, next) => {
  try {
    const event = await EventModel.findById(req.params.eventId);
console.log("getUserInvitation event:", event);
    const userInvitation = event.invitation;
    res.status(200).send(userInvitation);
  } catch (error) {
    next(error);
  }
};

// POST - create/ add one invitation
export const postOneInvitation = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.token.userId);
    const eventId = user.events;
    const response = await EventModel.findByIdAndUpdate(eventId, {
      invitation: req.body,
    });
    res.status(201).send({ approved: true, data: response });
  } catch (error) {
    next(error);
  }
};



