import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import { Spin } from "antd";
import { Teams } from "../Containers";
import { useTeams, useLoadingTeams, useOnNewPage } from "../Hooks";

const TeamsPage: FC<RouteComponentProps> = () => {
  const isLoadingTeams = useLoadingTeams();
  useOnNewPage("Teams");
  const teams = useTeams();
  if (isLoadingTeams) return <Spin size="large" />;
  if (teams.length === 0) return <p>No teams data</p>;
  return <Teams tableBodyData={teams} />;
};

export default TeamsPage;
