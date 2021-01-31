import { Request, Response } from "express";
import ICard from "../types/models/Card";
import Card from "../models/Card";

exports.fetchAllCards = async (req: Request, res: Response) => {
  const cards: Array<ICard> = await Card.find();

  if (!cards) {
    return res.status(404).json({ success: false, data: "Not Found" });
  }

  return res.status(200).json({ success: true, data: cards });
};

exports.createNewCard = async (req: Request, res: Response) => {
  try {
    let newCard: ICard = new Card(req.body);
    await newCard.save();

    return res.status(201).json({
      success: true,
      data: newCard,
    });
  } catch (err) {
    console.log("Err", err);
  }
};

exports.fetchCardDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const card: ICard | null = await Card.findOne({ _id: id }); // We will replce own id here *

    if (!card) {
      return res.status(404).json({ success: false, data: "Not Found" });
    }

    return res.status(200).json({ success: true, data: card });
  } catch (err) {
    console.log("Err", err);
  }
};

exports.updateCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Card.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    )
      .then((data: Object) => {
        return res.status(200).json({ success: true, data });
      })
      .catch((e: Object) => {
        return res
          .status(500)
          .json({ success: true, data: "Cannot Update Right Now" });
      });
  } catch (err) {
    return res.status(500).json({ success: true, data: "There was an Error" });
  }
};

exports.deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const card: ICard | null = await Card.findOneAndRemove({ _id: id });

    if (!card) {
      return res.status(404).json({ success: false, data: "Not Found" });
    }

    return res
      .status(200)
      .json({ success: true, data: "Card deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: true, data: "Cannot Update Right Now" });
  }
};
