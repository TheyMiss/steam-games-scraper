import axios from 'axios';
import { gameDataSchema } from '../schema/gameData.schema';
import { IGameData } from '../types/gameData.type';
import { IGameId } from '../types/gameId.type';
import { sleep } from '../utils/sleep';

export const getSpecificSteamGameData = async (gameIds: IGameId[]): Promise<IGameData[]> => {
  let isSleeping = false;
  const gameDataArr = [];

  console.log('Strating scraping...');

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

        if (isSuccess) gameDataArr.push(gameData);

        console.log(i, 'Succeed');
      } else {
        console.log(i, 'Failed');
      }
    } catch (error) {
      console.log(error);

      if (error?.response?.status === 403 || error?.response?.status === 429) {
        isSleeping = true;
      } else {
        console.log(error);
      }
    }
  }

  console.log('Done scraping...');

  return gameDataArr;
};
