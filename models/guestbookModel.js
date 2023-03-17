// not used at MVP- Version!!
import { Schema, model } from "mongoose";

const guestbookSchema = new Schema({
  reason: {
    type: String,
    default: "Geburtstag",
  },
  who: {
    type: String,
    default: "Hanna & Jan",
  },
  moreComment: {
    type: String,
    default:
      "Schön, dass Ihr gekommen seid, euch genommen habt die Zeit...Ihr wisst, die Zeit rennt wie der Wind und so ist das Fest vorbei geschwindt...Damit dieser Tag in ganz besonderer Erinnerung bleiben mag, wäre es sehr fein, wenn jeder schreibt ein paar Zeilen in dieses “Buch” hier rein... ",
  },
  fontSelection: {
    type: String,
    enum: [
      "Architects Daughter",
      "Bonheur Royale",
      "Great Vibes",
      "Kaushan Script",
      "Oregano",
    ],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadGuestbook: {
    type: Schema.Types.ObjectId,
    ref: "UploadGuestbook",
  },
});

const GuestbookModel = model("Guestbook", guestbookSchema);
export default GuestbookModel;

// Zuordung zum event über "user", zusätzlich einzeln???
