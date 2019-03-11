import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { Divider, Spin } from "antd";
import { History } from "../Containers";
import { Player } from "../Components";

import { usePlayerById, useLoadingPlayers } from "../Context";

type Props = {
  id: string;
};

const TeamsPage: FC<RouteComponentProps<Props>> = ({ id = "" }) => {
  const isLoadingPlayers = useLoadingPlayers();
  const player = usePlayerById(id);
  useEffect(() => {
    document.title = player ? player.name : "";
  });
  console.log(isLoadingPlayers);
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
