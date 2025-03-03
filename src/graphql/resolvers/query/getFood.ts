import { Food } from 'schema/mongoose/FoodSchema';

export const getFood = async (_: unknown, args: { id: string }) => {
  const { id } = args;
  return await Food.findById(id);
};
