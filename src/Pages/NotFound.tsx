import React, { FC } from "react";
import { RouteComponentProps, Link } from "@reach/router";

const NotFound: FC<RouteComponentProps> = () => {
  return (
    <div>
      <p>You've gone to a page that doesn't exist</p>
      <Link to="/">Reutrn Home</Link>
    </div>
  );
};

export default NotFound;
