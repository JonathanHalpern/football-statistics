import React, { FC } from "react";
import styled from "@emotion/styled";
import { Player } from "../Types";
import { Currency } from "../Components";

type BackgroundType = {
  url: string;
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

const Container = styled.div`
  position: relative;
  max-width: 380px;
  margin: auto;
  border: 1px solid black;
  border-radius: 20px;
`;

const Content = styled.div`
  font-size: 24px;
`;

type Props = Player;

const player: FC<Props> = ({
  name,
  age,
  nationality,
  position,
  value,
  flag_url,
  team_name
}) => (
  <Container>
    <Background url={flag_url} />
    <Content>
      <h2>{name}</h2>
      <p>Team: {team_name}</p>
      <p>Age: {age}</p>
      <p>Nationality: {nationality}</p>
      <p>Position: {position}</p>
      <p>
        Cost: <Currency value={value} />{" "}
      </p>
    </Content>
  </Container>
);
export default player;
