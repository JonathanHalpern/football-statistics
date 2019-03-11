import { createContext, useContext } from "react";
import { Player, Team, Game, AppContext } from "../Types";

export const initialState: AppContext = {
  teams: [],
  players: [],
  games: [],
  loadingTeams: false,
  loadingPlayers: false,
  loadingGames: false
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

const addPlayersTeams = (players: Player[], teams: Team[]) =>
  players.map(player => {
    const team = findTeamById(teams, player.team_id);
    return {
      ...player,
      team_name: team ? team.name : ""
    };
  });

const addPointsToTeams = (teams: Team[], games: Game[]) => {
  const teamIdPointsMap = new Map();
  teams.forEach(team => {
    teamIdPointsMap.set(team.id, 0);
  });
  games.forEach(game => {
    if (game.team_one_goals > game.team_two_goals) {
      const newValue = teamIdPointsMap.get(game.team_one_id) + 3;
      teamIdPointsMap.set(game.team_one_id, newValue);
    } else if (game.team_one_goals < game.team_two_goals) {
      const newValue = teamIdPointsMap.get(game.team_two_id) + 3;
      teamIdPointsMap.set(game.team_two_id, newValue);
    } else {
      teamIdPointsMap.set(
        game.team_one_id,
        teamIdPointsMap.get(game.team_one_id) + 1
      );
      teamIdPointsMap.set(
        game.team_two_id,
        teamIdPointsMap.get(game.team_two_id) + 1
      );
    }
  });
  return teams.map(team => ({
    ...team,
    points: teamIdPointsMap.get(team.id)
  }));
};

export const useOnNewPage = (title: string) => {
  document.title = title;
  window.scrollTo(0, 0);
};

export const useLoadingTeams = () => {
  const [{ loadingTeams }] = useContext(Store);
  return loadingTeams;
};

export const useLoadingPlayers = () => {
  const [{ loadingPlayers }] = useContext(Store);
  return loadingPlayers;
};

export const useLoadingGames = () => {
  const [{ loadingGames }] = useContext(Store);
  return loadingGames;
};

export const useTeams = () => {
  const [{ teams, games }] = useContext(Store);
  return addPointsToTeams(teams, games);
};

export const useTeamById = (id: string) => {
  const [{ teams }] = useContext(Store);
  return teams.find((team: Team) => team.id === id);
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

export const usePlayers = () => {
  const [{ players, teams }] = useContext(Store);
  return addPlayersTeams(players, teams);
};

export const usePlayersByTeamId = (team_id: string) => {
  const [{ players, teams }] = useContext(Store);
  return addPlayersTeams(
    players.filter(player => player.team_id === team_id),
    teams
  );
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
        team_two_logo_url: opposingTeam ? opposingTeam.logo_url : "",
        result,
        points
      };
    });
};

export const AppContextProvider = Store.Provider;

export default Store;
