import { gameIdInsertion } from './gameId.insertion';
import connectToDb from '../db/conn';
import disconnectFromDb from '../db/discoonn';
import { getSpecificSteamGameData } from '../scraper/getSteamGameData';

const scrapeNow = async (): Promise<void> => {
  connectToDb();
  await gameIdInsertion();
  await getSpecificSteamGameData();
  disconnectFromDb();
};

scrapeNow();
