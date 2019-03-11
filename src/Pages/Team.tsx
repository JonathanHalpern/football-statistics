import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import { Divider, Spin } from "antd";
import {
  useTeamById,
  usePlayersByTeamId,
  useGamesByTeamId,
  useLoadingTeams,
  useOnNewPage
} from "../Hooks";

import { Players, Games } from "../Containers";
import { Team } from "../Components";

type Props = {
  id: string;
};

const TeamPage: FC<RouteComponentProps<Props>> = ({ id = "" }) => {
  const team = useTeamById(id);
  const players = usePlayersByTeamId(id);
  const games = useGamesByTeamId(id);
  const isLoadingTeams = useLoadingTeams();
  useOnNewPage(team ? team.name : "");
  if (isLoadingTeams) return <Spin size="large" />;
  if (!team) return <p>Team not found</p>;

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
