import { Food } from 'schema/mongoose/FoodSchema';

export const getFoods = async (_: unknown, args: { limit: number }) => {
  const { limit } = args;
  return await Food.find().limit(limit);
};
