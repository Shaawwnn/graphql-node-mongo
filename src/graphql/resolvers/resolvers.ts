import { Fruit } from "@models";
import { Fruit as FruitRef } from "../../mongodb/models/Fruit";

export const fruitResolvers = {
  Query: {
    getFruit: async (_: unknown, args: { id: string }) => {
      const { id } = args;
      return await FruitRef.findById(id);
    },
    getFruits: async (_: unknown, args: { limit: number }) => {
      const { limit } = args;
      return await FruitRef.find().limit(limit);
    },
  },
  Mutation: {
    createFruit: async (_: unknown, args: Partial<Fruit>) => {
      const newFruit = new FruitRef({
        ...args,
        id: 2,
      });

      return await newFruit.save();
    },
    deleteFruit: async (_: unknown, args: { id: string }) => {
      const { id } = args;
      return await FruitRef.findByIdAndDelete(id);
    },
  },
};
