import axios from 'axios';
import { GameId } from '../model/gameId.model';

export const getAllSteamGameIds = async (): Promise<GameId[]> => {
  try {
    const res = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v1/');
    const games = res.data.applist.apps.app;

    return games;
  } catch (error) {
    throw new Error(error);
  }
};
