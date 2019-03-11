import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import { Spin } from "antd";
import {
  usePlayers,
  useOnNewPage,
  useLoadingPlayers,
  useLoadingTeams
} from "../Hooks";

import { Players } from "../Containers";

const PlayersPage: FC<RouteComponentProps> = () => {
  const players = usePlayers();
  useOnNewPage("Players");
  const isLoadingPlayers = useLoadingPlayers();
  const isLoadingTeams = useLoadingTeams();
  if (isLoadingPlayers || isLoadingTeams) return <Spin size="large" />;
  if (!players) return <p>No players</p>;

  return <Players tableBodyData={players} />;
};

export default PlayersPage;
