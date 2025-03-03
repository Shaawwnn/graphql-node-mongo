import { IFood } from '@models';
import { getUpdatedNutritionFacts } from 'graphql/utils/getUpdatedNutritionFacts';
import { Food } from 'schema/mongoose/FoodSchema';

export const updateFood = async (_: unknown, args: { id: string; updateFoodInput: Partial<IFood> }) => {
  const { id, updateFoodInput } = args;

  const { nutritionFacts, ...infoUpdates } = updateFoodInput;

  console.log(infoUpdates);
  return await Food.findByIdAndUpdate(
    id,
    {
      ...infoUpdates,
      $set: getUpdatedNutritionFacts(updateFoodInput.nutritionFacts)
    },
    { new: true }
  );
};
