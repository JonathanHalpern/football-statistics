import React, { useEffect, useReducer } from "react";
import { getTeams, getPlayers, getGames } from "./Api";
import { Header } from "./Components";
import Pages from "./Pages";

import { AppContextProvider } from "./Context";

import { AppContext, Team, Player, Game } from "./Types";

import "./App.css";

const initialState: AppContext = {
  teams: [],
  players: [],
  games: []
};

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

const reducer = (
  state: AppContext,
  action: SetTeamsAction | SetPlayersAction | SetGamesAction
) => {
  switch (action.type) {
    case "SET_TEAMS": {
      return { ...state, teams: action.teams };
    }
    case "SET_PLAYERS": {
      return { ...state, players: action.players };
    }
    case "SET_GAMES": {
      return { ...state, games: action.games };
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

  const fetchAllData = () => {
    getTeams().then(data => {
      dispatch({ type: "SET_TEAMS", teams: data });
    });
    getPlayers().then(data => {
      dispatch({ type: "SET_PLAYERS", players: data });
    });
    getGames().then(data => {
      dispatch({ type: "SET_GAMES", games: data });
    });
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
