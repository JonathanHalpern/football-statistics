import React, { FC } from "react";
import styled from "@emotion/styled";
import { Link } from "@reach/router";
import { Logo } from ".";

type Props = {
  src: string;
  teamName: string;
  url: string;
};

const Name = styled.span`
  margin-left: 10px;
`;

const nameWithLogo: FC<Props> = ({ src, teamName, url }) => (
  <Link to={url}>
    <Logo src={src} />
    <Name> {teamName}</Name>
  </Link>
);
export default nameWithLogo;
