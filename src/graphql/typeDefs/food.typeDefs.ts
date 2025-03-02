import { gql } from "apollo-server";

export const foodTypeDefs = gql`
  type NutritionFacts {
    calories: Int!
    carbohydrates: Int!
    sugar: Int!
    sodium: Int!
  }

  input NutritionFactsInput {
    calories: Int!
    carbohydrates: Int!
    sugar: Int!
    sodium: Int!
  }

  input UpdateNutritionFactsInput {
    calories: Int
    carbohydrates: Int
    sugar: Int
    sodium: Int
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
