import axios from 'axios';
import disconnectFromDb from '../db/discoonn';
import GameIdModel from '../model/gameId.model';
import { gameDataSchema } from '../schema/gameData.schema';
import { gameDataInsertion } from '../utils/gameData.insertion';
import { sleep } from '../utils/sleep';

export const getSpecificSteamGameData = async (): Promise<void> => {
  let isSleeping = false;
  const gameIds = await GameIdModel.find({});

  console.log('Starting scraping...');

  for (let i = 0; i < gameIds.length; i++) {
    if (isSleeping) {
      const minutes = 5;
      const seconds = 60;
      console.log('Sleeping for the next five minutes');
      await sleep(minutes * seconds * 1000);

      //goes back one gameId
      i -= 1;
    }

    if (isSleeping) {
      isSleeping = false;
    }

    const id = gameIds[i].appid;

    try {
      const { data } = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${id}`);

      const currentGame = data[id];

      if (currentGame.success && currentGame.data.recommendations !== undefined) {
        const gameData = {
          appid: currentGame.data.steam_appid,
          name: currentGame.data.name,
          image: currentGame.data.header_image,
          reviews: currentGame.data.recommendations.total,
        };

        const isSuccess = gameDataSchema.safeParse(gameData).success;

        if (isSuccess) gameDataInsertion(gameData);

        console.log(i, 'Succeed');
      } else {
        console.log(i, 'Failed');
      }
    } catch (error) {
      if (error?.response?.status === 403 || error?.response?.status === 429) {
        isSleeping = true;
      } else {
        console.log(error.message);
      }
    }
  }

  console.log('Done scraping...');
  disconnectFromDb();
};
