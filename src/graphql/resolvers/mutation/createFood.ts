import { IFood } from '@models';
import { Food } from 'schema/mongoose/FoodSchema';

export const createFood = async (_: unknown, args: { foodInput: IFood }): Promise<void> => {
  try {
    const { foodInput } = args;
    const newFood = new Food(foodInput);

    const food = await newFood.save();
    console.log(`🚀 ${food.name} successfully added!\n`);
    return;
    //
  } catch (error) {
    console.error('⚠️ Error inserting food data. \n', error);
    throw new Error(`\nFailed to create food entry: ${error}`);
  }
};
