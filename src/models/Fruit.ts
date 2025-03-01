import { NutritionFacts } from "./NutritionFacts";

export interface Fruit {
  id: string;
  name: string;
  description?: string;
  nutritionFacts: NutritionFacts;
}
