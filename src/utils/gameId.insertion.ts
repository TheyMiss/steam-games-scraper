import GameIdModel, { GameId } from '../model/gameId.model';
import { gameIdSchema } from '../schema/gameId.schema';
import { getAllSteamGameIds } from '../scraper/getAllSteamGameIds';

export const gameIdInsertion = async (): Promise<void> => {
  try {
    const gameIdArr: GameId[] = await getAllSteamGameIds();

    gameIdArr.slice(0, 10).forEach(async (game) => {
      const isValidationSuccess = gameIdSchema.safeParse({ appid: game.appid, name: game.name }).success;

      const gameIdExist = await GameIdModel.findOne({ appid: game.appid });

      if (isValidationSuccess) {
        if (!gameIdExist) {
          await GameIdModel.create({ appid: game.appid, name: game.name });
        } else {
          await GameIdModel.findOneAndUpdate({ appid: game.appid }, { appid: game.appid, name: game.name });
        }
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
