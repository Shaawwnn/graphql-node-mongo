import { gql } from 'apollo-server';

export const foodTypeDefs = gql`
  type NutritionFacts {
    calories: Float!
    carbohydrates: Float!
    sugar: Float!
    sodium: Float!
  }

  input NutritionFactsInput {
    calories: Float!
    carbohydrates: Float!
    sugar: Float!
    sodium: Float!
  }

  input UpdateNutritionFactsInput {
    calories: Float
    carbohydrates: Float
    sugar: Float
    sodium: Float
  }

  type Food {
    id: ID!
    name: String!
    description: String
    nutritionFacts: NutritionFacts!
  }

  input FoodInput {
    name: String!
    description: String
    nutritionFacts: NutritionFactsInput!
  }

  input UpdateFoodInput {
    name: String
    description: String
    nutritionFacts: UpdateNutritionFactsInput
  }

  type Query {
    getFood(id: ID!): Food!
    getFoods(limit: Int!): [Food]
  }

  type Mutation {
    createFood(foodInput: FoodInput): Food!
    deleteFood(id: ID!): Food!
    updateFood(id: ID!, updateFoodInput: UpdateFoodInput): Food!
  }
`;
