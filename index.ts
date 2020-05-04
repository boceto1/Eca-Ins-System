import { Server } from './app/server';
import express from 'express';
import { PORT } from './const';

const app = express();

const port = parseInt(PORT);

const server = new Server(app);
server.start(port);