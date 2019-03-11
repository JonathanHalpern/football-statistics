import axios from "axios";

type Data = Object;

export const fetchData = async (endpoint: string, data?: Data) => {
  try {
    const response = await axios({
      method: "post",
      url: `https://alphafx-code-test-api.herokuapp.com/api${endpoint}`,
      data
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getTeams = (data?: Data) => fetchData("/teams", data);

export const getPlayers = (data?: Data) => fetchData("/teams/players", data);

export const getGames = (data?: Data) => fetchData("/teams/games", data);

export const addAGame = (data: Data) => fetchData("/teams/games/new", data);
