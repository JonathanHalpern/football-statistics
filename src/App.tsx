import React, { useEffect, useReducer } from "react";
import { getTeams, getPlayers, getGames } from "./Api";
import { Header } from "./Components";
import Pages from "./Pages";
import { message } from "antd";

import { AppContextProvider } from "./Hooks";
import { removeInvalidGames } from "./Utils";

import { AppContext, Team, Player, Game } from "./Types";

export const initialState: AppContext = {
  teams: [],
  players: [],
  games: [],
  loadingTeams: false,
  loadingPlayers: false,
  loadingGames: false
};

import "./App.css";

type SetTeamsAction = {
  type: "SET_TEAMS";
  teams: Team[];
};

type SetPlayersAction = {
  type: "SET_PLAYERS";
  players: Player[];
};

type SetGamesAction = {
  type: "SET_GAMES";
  games: Game[];
};

type LoadTeamsAction = {
  type: "SET_IS_LOADING_TEAMS";
  isLoading: boolean;
};

type LoadPlayersAction = {
  type: "SET_LOAD_PLAYERS";
  isLoading: boolean;
};

type LoadGamesAction = {
  type: "SET_IS_LOADING_GAMES";
  isLoading: boolean;
};

const reducer = (
  state: AppContext,
  action:
    | SetTeamsAction
    | SetPlayersAction
    | SetGamesAction
    | LoadTeamsAction
    | LoadPlayersAction
    | LoadGamesAction
) => {
  switch (action.type) {
    case "SET_TEAMS": {
      return { ...state, teams: action.teams, loadingTeams: false };
    }
    case "SET_PLAYERS": {
      return { ...state, players: action.players, loadingPlayers: false };
    }
    case "SET_GAMES": {
      return { ...state, games: action.games, loadingGames: false };
    }
    case "SET_IS_LOADING_TEAMS": {
      return { ...state, loadingTeams: action.isLoading };
    }
    case "SET_LOAD_PLAYERS": {
      return { ...state, loadingTeams: action.isLoading };
    }
    case "SET_IS_LOADING_GAMES": {
      return { ...state, loadingTeams: action.isLoading };
    }
    default: {
      return state;
    }
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchTeams = async () => {
    dispatch({ type: "SET_IS_LOADING_TEAMS", isLoading: true });
    const response = await getTeams();
    if (response.success) {
      dispatch({ type: "SET_TEAMS", teams: response.data });
    } else {
      dispatch({ type: "SET_IS_LOADING_TEAMS", isLoading: false });
      message.error(`There was a problem fetching the teams`);
    }
  };

  const fetchPlayers = async () => {
    dispatch({ type: "SET_LOAD_PLAYERS", isLoading: true });
    const response = await getPlayers();
    if (response.success) {
      dispatch({ type: "SET_PLAYERS", players: response.data });
    } else {
      dispatch({ type: "SET_LOAD_PLAYERS", isLoading: false });
      message.error(`There was a problem fetching the players`);
    }
  };

  const fetchGames = async () => {
    dispatch({ type: "SET_IS_LOADING_GAMES", isLoading: true });
    const response = await getGames();
    if (response.success) {
      dispatch({ type: "SET_GAMES", games: removeInvalidGames(response.data) });
    } else {
      dispatch({ type: "SET_IS_LOADING_GAMES", isLoading: false });
      message.error(`There was a problem fetching the games`);
    }
  };

  const fetchAllData = () => {
    fetchTeams();
    fetchPlayers();
    fetchGames();
  };

  return (
    <div className="App">
      <AppContextProvider value={[state, fetchAllData]}>
        <Header />
        <Pages />
      </AppContextProvider>
    </div>
  );
};

export default App;
