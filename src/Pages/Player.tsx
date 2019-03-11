import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import { Divider, Spin } from "antd";
import { History } from "../Containers";
import { Player } from "../Components";

import { usePlayerById, useLoadingPlayers, useOnNewPage } from "../Hooks";

type Props = {
  id: string;
};

const TeamsPage: FC<RouteComponentProps<Props>> = ({ id = "" }) => {
  const isLoadingPlayers = useLoadingPlayers();
  const player = usePlayerById(id);
  useOnNewPage(player ? player.name : "");
  if (isLoadingPlayers) return <Spin size="large" />;
  if (!player) return <p>Player not found</p>;
  return (
    <>
      <Divider />
      <Player {...player} />
      <Divider />
      <History tableBodyData={player.history} />
    </>
  );
};

export default TeamsPage;
