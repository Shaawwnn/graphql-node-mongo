import { model, Schema } from "mongoose";

const nutritionFactsSchema = new Schema({
  calories: Number,
  carbohydrates: Number,
  sugar: Number,
  sodium: Number,
});

const foodSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  description: String,
  nutritionFacts: nutritionFactsSchema,
});

export const Food = model("Food", foodSchema);
