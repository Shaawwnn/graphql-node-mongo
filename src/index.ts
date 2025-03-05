import { ApolloServer } from 'apollo-server';
import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
configDotenv({ path: path.resolve(__dirname, '../.env.dev') });

const MONGO_URL = process.env.MONGO_URL;

const server = new ApolloServer({
  typeDefs,
  resolvers
});

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('MongoDB Connection is successful');
      return server.listen({ port: 4000 });
    })
    .then(res => {
      console.log(`Server is running on port ${res.url}`);
    });
}
