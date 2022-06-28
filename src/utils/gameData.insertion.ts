import GameDataModel from '../model/gameData.model';
import GameIdModel from '../model/gameId.model';
import { getSpecificSteamGameData } from '../scraper/getSteamGameData';

export const gameDataInsertion = async (): Promise<void> => {
  try {
    const gameIds = await GameIdModel.find({});

    const gameDatas = await getSpecificSteamGameData(gameIds);

    gameDatas.forEach(async (gameData) => {
      const gameIdExist = await GameDataModel.findOne({ appid: gameData.appid });

      if (!gameIdExist) {
        await GameDataModel.create(gameData);
      } else {
        await GameDataModel.findOneAndUpdate({ appid: gameData.appid }, gameData);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
