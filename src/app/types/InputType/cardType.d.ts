import * as mongoose from "mongoose";

interface CardType {
  name: string;
  // user:  mongoose.Schema.Types.ObjectId;
  amount: string;
}

export default CardType;
