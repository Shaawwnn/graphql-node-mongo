import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { contextFn } from '@lib';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

const app = express();

const MONGO_URL = process.env.MONGO_URL;

const runServer = async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });

    await server.start();
    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(server, {
        context: contextFn
      })
    );

    await mongoose.connect(MONGO_URL || '');
    console.log('🌱 MongoDB Connection is successful');

    app.listen(process.env.PORT, () => {
      console.log('🚀 Server running at http://localhost:4000');
    });
  } catch (error) {
    console.error(`❌ Error starting server. ${error}`);
    process.exit(1);
  }
};

runServer();
