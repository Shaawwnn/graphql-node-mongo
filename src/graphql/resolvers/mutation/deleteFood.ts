import { Food } from 'schema/mongoose/FoodSchema';

export const deleteFood = async (_: unknown, args: { id: string }) => {
  const { id } = args;
  return await Food.findByIdAndDelete(id);
};
