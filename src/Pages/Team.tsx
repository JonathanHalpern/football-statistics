import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { Divider, Spin } from "antd";
import { useTeamById, usePlayersByTeamId, useGamesByTeamId } from "../Context";

import { Players, Games } from "../Containers";
import { Team } from "../Components";

type Props = {
  id: string;
};

const TeamPage: FC<RouteComponentProps<Props>> = ({ id = "" }) => {
  const team = useTeamById(id);
  const players = usePlayersByTeamId(id);
  const games = useGamesByTeamId(id);
  useEffect(() => {
    document.title = team ? team.name : "";
  });
  if (!(team && players && games)) return <Spin size="large" />;

  return (
    <>
      <Team {...team} />
      <Divider />
      <Players tableBodyData={players} />
      <Divider />
      <Games tableBodyData={games} />
    </>
  );
};

export default TeamPage;
