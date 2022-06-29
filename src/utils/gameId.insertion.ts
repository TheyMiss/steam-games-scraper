import GameIdModel, { GameId } from '../model/gameId.model';
import { gameIdSchema } from '../schema/gameId.schema';
import { getAllSteamGameIds } from '../scraper/getAllSteamGameIds';
import { getSpecificSteamGameData } from '../scraper/getSteamGameData';

export const gameIdInsertion = async (): Promise<void> => {
  try {
    const gameIdArr: GameId[] = await getAllSteamGameIds();

    for (const game of gameIdArr) {
      const isValidationSuccess = gameIdSchema.safeParse({ appid: game.appid, name: game.name }).success;

      const gameIdExist = await GameIdModel.findOne({ appid: game.appid });

      if (isValidationSuccess) {
        if (!gameIdExist) {
          await GameIdModel.create({ appid: game.appid, name: game.name });
        } else {
          await GameIdModel.findOneAndUpdate({ appid: game.appid }, { appid: game.appid, name: game.name });
        }
      }
    }

    console.log('Got all games ids and saved them');

    getSpecificSteamGameData();
  } catch (error) {
    console.log(error.message);
  }
};
