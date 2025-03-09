import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { resolvers } from './src/graphql/resolvers';
import { typeDefs } from './src/graphql/typeDefs';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

const runServer = async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });

    await server.start();
    app.use('/graphql', expressMiddleware(server) as any);

    await mongoose.connect(MONGO_URL || '');
    console.log('☘️ MongoDB Connection is successful');

    app.listen(process.env.PORT, () => {
      console.log('🚀 Server running at http://localhost:4000');
    });
  } catch (error) {
    console.error(`❌ Error starting server. ${error}`);
    process.exit(1);
  }
};

runServer();
