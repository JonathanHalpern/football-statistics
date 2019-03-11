import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import { Players } from "../Containers";

// import { useAllPlayers } from "../Context";

const PlayersPage: FC<RouteComponentProps> = () => {
  // const players = useAllPlayers();
  return (
    <div>
      {/* {players && players.length && <Players tableBodyData={players} />} */}
    </div>
  );
};

export default PlayersPage;
