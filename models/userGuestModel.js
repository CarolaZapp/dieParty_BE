import { Schema } from "mongoose";

const userGuestSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  send: {
    type: Boolean,
    default: true,
  },
  group: {
    type: String,
    enum: ["familie", "freunde", "kollegen", "bekannte", "bitte auswählen"],
    default: "bitte auswählen",
  },
  // // // from here done by guests... // // //
  password: {
    type: String,
    // required: true,
  },
  join: {
    type: Boolean,
    default: true,
  },
  adults: {
    type: String,
    enum: ["1", "2", "3", "4", "5"],
    required: true,
  },
  kids: {
    type: String,
    enum: ["0", "1", "2", "3", "4", "5"],
  },

  arrival: {
    type: String,
  },
  departure: {
    type: String,
  },
  lodging: {
    type: Boolean,
    default: false,
  },
  kindlodging: {
    type: String,
    enum: ["hotel", "pension", "sofa", "bitte auswählen"],
    default: "bitte auswählen",
  },
  vegetarian: {
    type: Boolean,
    default: false,
  },
  vegan: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
    default:
      "Bitte notiere Unverträglichkeiten oder Allergien damit die Küche darauf Rücksicht nehmen kann",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Model -Template for DB entries
// const UserGuestModel = model("UserGuest", userGuestSchema);

export default userGuestSchema;
