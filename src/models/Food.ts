import { INutritionFacts } from "./NutritionFacts";

export interface IFood {
  id: string;
  name: string;
  description?: string;
  nutritionFacts: INutritionFacts;
}
