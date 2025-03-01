import { model, Schema } from "mongoose";

const nutritionFactsSchema = new Schema({
  calories: Number,
  carbohydrates: Number,
  sugar: Number,
  sodium: Number,
});

const fruitSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  description: String,
  nutritionFacts: nutritionFactsSchema,
});

export const Fruit = model("Fruit", fruitSchema);
