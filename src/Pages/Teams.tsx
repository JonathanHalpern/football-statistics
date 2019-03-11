import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { Spin } from "antd";
import { Teams } from "../Containers";
import { useTeams, useLoadingTeams } from "../Context";

const TeamsPage: FC<RouteComponentProps> = () => {
  const isLoadingTeams = useLoadingTeams();
  useEffect(() => {
    document.title = "Teams";
  });
  const teams = useTeams();
  if (isLoadingTeams) return <Spin size="large" />;
  if (teams.length === 0) return <p>No teams data</p>;
  return <Teams tableBodyData={teams} />;
};

export default TeamsPage;
