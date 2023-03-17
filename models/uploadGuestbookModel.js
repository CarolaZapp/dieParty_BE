// not used at MVP- Version!!
import { Schema, model } from "mongoose";

const uploadGuestbookSchema = new Schema({
  imgage: {
    type: String,
  },
  comment: {
    type: String,
    default: "Anna & Max",
  },
  moreComment: {
    type: String,
    default:
      "Vielen Dank für die Einladung. Wir freuen uns hier zu sein und wünschen Euch alles erdenklich Gute und ganz viel Gesundheit... Passt auf Euch auf! Liebe Grüße Anna & Max",
  },
  userGuest: {
    type: Schema.Types.ObjectId,
    ref: "UserGuest",
    required: true,
  },
});

const UploadGuestbookModel = model("UploadGuestbook", uploadGuestbookSchema);
export default UploadGuestbookModel;
