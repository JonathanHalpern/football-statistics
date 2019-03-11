import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { Spin } from "antd";
import { useTeams } from "../Context";
import { AddGame } from "../Components";

const AdminPage: FC<RouteComponentProps> = () => {
  useEffect(() => {
    document.title = "Admin";
  });
  const teams = useTeams();
  if (!teams) return <Spin size="large" />;
  return <AddGame teams={teams} />;
};

export default AdminPage;
