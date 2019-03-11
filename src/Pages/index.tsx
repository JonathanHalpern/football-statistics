import React, { Fragment } from "react";
import { Router } from "@reach/router";

import NotFound from "./NotFound";
import Teams from "./Teams";
import Team from "./Team";
import Player from "./Player";
import Players from "./Players";
import Admin from "./Admin";

const Pages = () => (
  <Router primary={false} component={Fragment}>
    <NotFound default />
    <Teams path="/" />
    <Team path="/team/:id" />
    <Player path="/players/:id" />
    <Players path="/players" />
    <Admin path="/admin" />
  </Router>
);

export default Pages;
