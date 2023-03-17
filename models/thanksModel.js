import { Schema, model } from "mongoose";

const thanksSchema = new Schema({
  topleft: String,
  topmiddle: String,
  topright: String,

  reason: {
    type: String,
    default: "Vielen Dank",
  },
  who: {
    type: String,
    default: "Hanna & Jan",
  },

  middleleft: String,
  middleright: String,

  title: {
    type: String,
    default: "Ihr Lieben,",
  },
  moreComment: {
    type: String,
    default:
      "wir hatten einen unvergesslichen Tag mit unzähligen wunderschönen Momenten. Dank euch wird er uns immer in Erinnerung bleiben.Wir möchten uns ganz herzlich für die zahlreichen Glückwünsche, Geschenke und Aufmerksamkeiten zu unserem Event bedanken.",
  },

  bottom: String,

  comment: {
    type: String,
    default: "26.08.2023",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// const ThanksModel = model("Thanks", thanksSchema);
// export default ThanksModel;

export default thanksSchema;
