import express, { NextFunction, Request, Response } from 'express';
import config from './config/default';
import connectToDb from './db/conn';
import log from './logger';
import { gameDataInsertion } from './utils/gameData.insertion';
import { gameIdInsertion } from './utils/gameId.insertion';

const app = express();

const PORT = process.env.PORT;

gameDataInsertion();
//gameIdInsertion();

app.listen(PORT, () => {
  log.info(`Server is listening at ${config.port}`);
  connectToDb();
});
