import { Document } from "mongoose";

interface ICard extends Document {
  name?: string;
  amount?: string;
}

export default ICard;
