import { gql } from "apollo-server";

export const fruitTypeDefs = gql`
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

  type Fruit {
    id: ID!
    name: String!
    description: String
    nutritionFacts: NutritionFacts!
  }

  input FruitInput {
    name: String!
    description: String
    nutritionFacts: NutritionFactsInput!
  }

  type Query {
    getFruit(id: ID!): Fruit!
    getFruits(limit: Int!): [Fruit]
  }

  type Mutation {
    createFruit(fruitInput: FruitInput): Fruit!
    deleteFruit(id: ID!): Fruit!
    updateFruit(id: ID!, fruitInput: FruitInput): Fruit!
  }
`;
