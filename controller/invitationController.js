import InvitationModel from "../models/invitationModel.js";
import EventModel from "../models/eventModel.js";
import UserModel from "../models/userModel.js";

// GET - find one invitation
export const getInvitation = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.token.userId);
    const eventId = user.events;
    const event = await EventModel.findById(eventId);
    const invitation = event.invitation;
    res.status(200).send(invitation);
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

//PATCH - update / change one invitation by ID
export const updateOneInvitation = async (req, res, next) => {
  try {
    const invitation = await InvitationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!invitation) {
      const error = new Error(`Eine Einladung mit der id ${id} gibt es nicht!`);
      error.statusCode = 404;
      throw error;
    }
    res.status(201).send(invitation);
  } catch (error) {
    next(error);
  }
};
