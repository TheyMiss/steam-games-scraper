import { gameIdInsertion } from './gameId.insertion';
import connectToDb from '../db/conn';

const scrapeNow = (): void => {
  connectToDb();
  gameIdInsertion();
};

scrapeNow();
