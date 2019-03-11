import React, { Fragment } from "react";
import { Router } from "@reach/router";

import Teams from "./Teams";
import Team from "./Team";
import Players from "./Players";
import Player from "./Player";
import Admin from "./Admin";

const Pages = () => (
  <Router primary={false} component={Fragment}>
    <Teams path="/" />
    <Team path="/team/:id" />
    <Players path="/players" />
    <Player path="/player/:id" />
    <Admin path="/admin" />
  </Router>
);

export default Pages;
