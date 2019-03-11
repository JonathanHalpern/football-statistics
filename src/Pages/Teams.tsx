import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { Spin } from "antd";
import { Teams } from "../Containers";
import { useTeams } from "../Context";

const TeamsPage: FC<RouteComponentProps> = () => {
  useEffect(() => {
    document.title = "Teams";
  });
  const teams = useTeams();
  if (!teams) return <Spin size="large" />;
  return <div>{teams && teams.length && <Teams tableBodyData={teams} />}</div>;
};

export default TeamsPage;
