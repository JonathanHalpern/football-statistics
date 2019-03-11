import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { Divider, Spin } from "antd";
import { History } from "../Containers";
import { Player } from "../Components";
import { Link } from "@reach/router";

import { usePlayerById } from "../Context";

type Props = {
  id: string;
};

const TeamsPage: FC<RouteComponentProps<Props>> = ({ id = "" }) => {
  const player = usePlayerById(id);
  useEffect(() => {
    document.title = player ? player.name : "";
  });
  if (!player) return <Spin size="large" />;

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
