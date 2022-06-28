import axios from 'axios';

export const getAllSteamGameIds = async () => {
  try {
    const res = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v1/');
    const games = res.data.applist.apps.app;

    return games;
  } catch (error) {
    throw new Error(error);
  }
};
