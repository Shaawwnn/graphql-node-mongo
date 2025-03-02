import { INutritionFacts } from "@models";

export const getUpdatedNutritionFacts = (
  updatedNutritionFacts: Partial<INutritionFacts> | undefined,
): { [key: string]: any } => {
  if (!updatedNutritionFacts) return [];

  return Object.fromEntries(
    Object.entries(updatedNutritionFacts).map(([key, value]) => [
      `nutritionFacts.${key}`,
      value,
    ]),
  );
};
