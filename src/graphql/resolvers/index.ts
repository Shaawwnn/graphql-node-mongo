import { createFood } from './mutation/createFood';
import { deleteFood } from './mutation/deleteFood';
import { updateFood } from './mutation/updateFood';
import { getFood } from './query/getFood';
import { getFoods } from './query/getFoods';

export const resolvers = {
  Query: {
    getFood,
    getFoods
  },
  Mutation: {
    createFood,
    deleteFood,
    updateFood
  }
};
