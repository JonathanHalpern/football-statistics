import axios from "axios";
import moment from "moment";

type Data = Object;
import { Game } from "../Types";

const removeInvalidGames = async (gamesPromise: Promise<Game[]>) => {
  const games = await gamesPromise;
  return games.filter(
    ({ team_one_id, team_two_id, team_one_goals, team_two_goals, date }) =>
      team_one_id !== team_two_id &&
      team_one_goals >= 0 &&
      team_two_goals >= 0 &&
      moment(date).isSameOrBefore()
  );
};

export const fetchData = async (endpoint: string, data?: Data) => {
  const response = await axios({
    method: "post",
    url: `https://alphafx-code-test-api.herokuapp.com/api${endpoint}`,
    data
  });
  return response.data;
};

export const getTeams = async (data?: Data) => {
  const response = await fetchData("/teams", data);
  return response.data;
};

export const getPlayers = async (data?: Data) => {
  const response = await fetchData("/teams/players", data);
  return response.data;
};

export const getGames = async (data?: Data) => {
  const response = await fetchData("/teams/games", data);
  return removeInvalidGames(response.data);
};

export const addAGame = (data: Data) => fetchData("/teams/games/new", data);

// export const getTeam = async (data?: Data) => {
//   fetchData("/teams", data)
