import { IFood } from "@models";
import { model, Schema } from "mongoose";

const nutritionFactsSchema = new Schema({
  calories: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  sugar: { type: Number, required: true },
  sodium: { type: Number, required: true },
});

const foodSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  nutritionFacts: {
    type: nutritionFactsSchema,
    required: true,
  },
});

export const Food = model<IFood>("Food", foodSchema);
