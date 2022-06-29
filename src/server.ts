import express from 'express';
import config from './config/default';
import connectToDb from './db/conn';
import log from './logger';
import { gameIdInsertion } from './utils/gameId.insertion';
import schedule from 'node-schedule';

const app = express();

const PORT = process.env.PORT;

//scrapes At 00:00 on day-of-month 1.
schedule.scheduleJob('0 0 1 * *', function () {
  gameIdInsertion();
});

app.listen(PORT, () => {
  log.info(`Server is listening at ${config.port}`);
  connectToDb();
});
