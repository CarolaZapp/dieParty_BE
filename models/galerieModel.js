// not used at MVP- Version!!
import { Schema, model } from "mongoose";

const galerieSchema = new Schema({
  imgages: [
    {
      type: String,
    },
    // Limit picture amount?
  ],
  reason: {
    type: String,
    default: "Bildergalerie",
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

const GalerieModel = model("Galerie", galerieSchema);
export default GalerieModel;
