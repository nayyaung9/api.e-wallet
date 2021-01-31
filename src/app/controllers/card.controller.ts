import { Request, Response } from "express";
import ICard from "../types/models/Card";
import Card from "../models/Card";

exports.createNewCard = async (req: Request, res: Response) => {
  console.log(req.body);
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
