import { NutritionFacts } from "./NutritionFacts";

export interface Food {
  id: string;
  name: string;
  description?: string;
  nutritionFacts: NutritionFacts;
}
