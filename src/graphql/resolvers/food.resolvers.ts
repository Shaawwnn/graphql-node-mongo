import { IFood } from "@models";
import { getUpdatedNutritionFacts } from "graphql/utils/getUpdatedNutritionFacts";
import { Food } from "schema/mongoose/FoodSchema";

export const foodResolvers = {
  Query: {
    getFood: async (_: unknown, args: { id: string }) => {
      const { id } = args;
      return await Food.findById(id);
    },
    getFoods: async (_: unknown, args: { limit: number }) => {
      const { limit } = args;
      return await Food.find().limit(limit);
    },
  },
  Mutation: {
    createFood: async (_: unknown, args: { foodInput: IFood }) => {
      try {
        const { foodInput } = args;
        const newFood = new Food(foodInput);

        return await newFood.save();
        //
      } catch (error) {
        console.error("Error inserting food data.");
        throw error;
      }
    },
    deleteFood: async (_: unknown, args: { id: string }) => {
      const { id } = args;
      return await Food.findByIdAndDelete(id);
    },
    updateFood: async (
      _: unknown,
      args: { id: string; updateFoodInput: Partial<IFood> },
    ) => {
      const { id, updateFoodInput } = args;

      const { nutritionFacts, ...infoUpdates } = updateFoodInput;

      console.log(infoUpdates);
      return await Food.findByIdAndUpdate(
        id,
        {
          ...infoUpdates,
          $set: getUpdatedNutritionFacts(updateFoodInput.nutritionFacts),
        },
        { new: true },
      );
    },
  },
};
