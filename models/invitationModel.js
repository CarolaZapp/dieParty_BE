import { Schema } from "mongoose";

const invitationSchema = new Schema({
  reason: {
    type: String,
    default: "WIR MÖCHTEN MIT EUCH GEBURTSTAG FEIERN !",
  },
  comment: {
    type: String,
    default:
      "Bitte meldet euch bis zum 26.05.2023 über die Anmeldung am Ende der Seite an...",
  },
  when: {
    type: String,
    default: "AM SAMSTAG, DEN 26.08.2023 UM 15:00 UHR",
  },
  where: {
    type: String,
    default: "BEI UNS ZU HAUSE ... MUSTERWEG 7, 12345 MUSTERDORF",
  },
  moreComment: {
    type: String,
    default: "Wir freuen uns auf Euch!",
  },
  who: {
    type: String,
    default: "Hanna & Jan",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// const InvitationModel = model("Invitation", invitationSchema);
// export default InvitationModel;

export default invitationSchema;
