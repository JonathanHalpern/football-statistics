import React, { FC } from "react";
import styled from "@emotion/styled";
import tinyolor from "tinycolor2";
import { Team } from "../Types";
import { Currency } from "../Components";

type BackgroundType = {
  url: string;
};

type ContainerType = {
  borderColour: string;
};

const Background = styled.div<BackgroundType>`
  background-image: ${({ url }) => `url(${url})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.1;
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  pointer-events: none;
`;

const Container = styled.div<ContainerType>`
  position: relative;
  max-width: 380px;
  margin: auto;
  border: 1px solid
    ${({ borderColour }) => `${tinyolor(borderColour).toHexString()}`};
  border-radius: 20px;
`;

const Content = styled.div`
  font-size: 24px;
`;

type Props = Team;

const team: FC<Props> = ({ name, city, budget, founded, logo_url, colour }) => (
  <Container borderColour={colour}>
    <Background url={logo_url} />
    <Content>
      <h2>{name}</h2>
      <p>Ciy: {city}</p>
      <p>Founded: {founded}</p>
      <p>City: {city}</p>
      <p>
        Value: <Currency value={budget} />
      </p>
    </Content>
  </Container>
);
export default team;
