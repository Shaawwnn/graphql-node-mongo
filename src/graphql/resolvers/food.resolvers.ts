import { Food } from "@models";
import { Food as FoodRef } from "../../mongodb/models/Food";

export const foodResolvers = {
  Query: {
    getFood: async (_: unknown, args: { id: string }) => {
      const { id } = args;
      return await FoodRef.findById(id);
    },
    getFoods: async (_: unknown, args: { limit: number }) => {
      const { limit } = args;
      return await FoodRef.find().limit(limit);
    },
  },
  Mutation: {
    createFood: async (_: unknown, args: Partial<Food>) => {
      const newFood = new FoodRef({
        ...args,
        id: 2,
      });

      return await newFood.save();
    },
    deleteFood: async (_: unknown, args: { id: string }) => {
      const { id } = args;
      return await FoodRef.findByIdAndDelete(id);
    },
  },
};
