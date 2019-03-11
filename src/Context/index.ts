import { createContext, useContext, useState } from "react";
import { Player, Team, Game, Era, AppContext } from "../Types";

const initialState: AppContext = {
  teams: [],
  players: [],
  games: []
};

const Store = createContext<[AppContext, () => void]>([
  initialState,
  () => null
]);

export const useFetchAll = () => {
  const [_, fetchAll] = useContext(Store);
  return fetchAll;
};

const findTeamById = (teams: Team[], team_id: string) =>
  teams.find(({ id }) => team_id === id);

export const useTeams = () => {
  const [state] = useContext(Store);
  return state.teams;
};

export const useTeamById = (id: string) => {
  const [state] = useContext(Store);
  return state.teams.find((team: Team) => team.id === id);
};

export const usePlayerById = (id: string) => {
  const [{ players, teams }] = useContext(Store);

  let team;
  const player = players.find((player: Player) => player.id === id);

  if (player) {
    team = findTeamById(teams, player.team_id);
    const updatedHistory = player.history.map(era => {
      const previousTeam = findTeamById(teams, era.team_id);
      return {
        ...era,
        team_name: previousTeam ? previousTeam.name : "not found",
        history_id: JSON.stringify(era)
      };
    });
    if (team) {
      return {
        ...player,
        team_name: team.name,
        history: updatedHistory
      };
    }
  }
};

export const usePlayersByTeamId = (team_id: string) => {
  const [{ players, teams }] = useContext(Store);
  return players
    .filter(player => player.team_id === team_id)
    .map(player => ({
      ...player,
      team: findTeamById(teams, player.id)
    }));
};

export const useGamesByTeamId = (team_id: string) => {
  const [{ teams, games }] = useContext(Store);
  return games
    .filter(
      game => game.team_one_id === team_id || game.team_two_id === team_id
    )
    .map(game => {
      if (game.team_one_id === team_id) {
        return {
          ...game,
          home: true
        };
      }
      return {
        ...game,
        team_one_id: game.team_two_id,
        team_two_id: game.team_one_id,
        team_one_goals: game.team_two_goals,
        team_two_goals: game.team_one_goals,
        home: false
      };
    })
    .map(game => {
      const opposingTeam = findTeamById(teams, game.team_two_id);
      const goalDifference = game.team_one_goals - game.team_two_goals;
      let result;
      let points;
      if (goalDifference > 0) {
        result = "Win";
        points = 3;
      } else if (goalDifference < 0) {
        result = "Loss";
        points = 0;
      } else {
        result = "Draw";
        points = 1;
      }
      return {
        ...game,
        team_two_name: opposingTeam ? opposingTeam.name : "not found",
        result,
        points
      };
    });
};

export const AppContextProvider = Store.Provider;

export const AppContextConsumer = Store.Consumer;

export default Store;
