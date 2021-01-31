import { model, Schema } from "mongoose";
import CardType from "../types/InputType/cardType";

// const { ObjectId } = Schema.Types;

const CardSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    // users: [{ type: ObjectId, ref: "User" }],
    amount: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

class CardModel extends model("card", CardSchema) {
  constructor(card: CardType) {
    super(card);
  }
}

export default CardModel;
