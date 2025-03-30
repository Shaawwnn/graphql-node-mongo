import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { contextFn } from '@lib';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

dotenv.config();

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

const runServer = async () => {
  try {
    if (!MONGO_URL) {
      throw new Error('MONGO_URL is not defined in .env');
    }

    await mongoose.connect(MONGO_URL);
    console.log('🌱 MongoDB Connection is successful');

    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true
      })
    );
    app.use(cookieParser());
    app.use(express.json());

    const server = new ApolloServer({
      typeDefs,
      resolvers
    });

    await server.start();
    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: contextFn
      })
    );

    // ✅ Start the server *after* MongoDB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Error starting server: `, error);
    process.exit(1);
  }
};

runServer();
