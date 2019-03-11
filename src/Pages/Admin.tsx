import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import { Spin } from "antd";
import { useTeams, useOnNewPage } from "../Hooks";
import { AddGame } from "../Components";

const AdminPage: FC<RouteComponentProps> = () => {
  useOnNewPage("Admin");
  const teams = useTeams();
  if (!teams) return <Spin size="large" />;
  return <AddGame teams={teams} />;
};

export default AdminPage;
