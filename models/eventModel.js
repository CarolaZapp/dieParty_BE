import { Schema, model } from "mongoose";
import userGuestSchema from "./userGuestModel.js";
import invitationSchema from "./invitationModel.js";
import thanksSchema from "./thanksModel.js";

const eventSchema = new Schema({
  theme: {
    type: String, // Jubiläum, Geburtstag, Hochzeitstag
    required: true,
  },
  style: {
    type: String,
    enum: ["Bunt", "Rosen", "Goldig"],
    required: true,
  },
  invitation: invitationSchema,
  guestbook: {
    type: Schema.Types.ObjectId,
    ref: "Guestbook",
  },
  thanks: thanksSchema,
  galerie: {
    type: Schema.Types.ObjectId,
    ref: "Galerie",
  },
  userGuest: [userGuestSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const EventModel = model("Event", eventSchema);
export default EventModel;
