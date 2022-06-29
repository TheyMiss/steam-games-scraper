import GameDataModel from '../model/gameData.model';
import { IGameData } from '../types/gameData.type';

export const gameDataInsertion = async (gameData: IGameData): Promise<void> => {
  try {
    const gameIdExist = await GameDataModel.findOne({ appid: gameData.appid });

    if (!gameIdExist) {
      await GameDataModel.create(gameData);
    } else {
      await GameDataModel.findOneAndUpdate({ appid: gameData.appid }, gameData);
    }
  } catch (error) {
    console.log(error.message);
  }
};
