import React, { FC, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import styled from "@emotion/styled";

import { Spin, Form, Select } from "antd";

import {
  usePlayers,
  useOnNewPage,
  useLoadingPlayers,
  useLoadingTeams
} from "../Hooks";

import { Players } from "../Containers";

const FormItem = Form.Item;
const Option = Select.Option;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-evenly;
`;

//TODO: refactor filtering form into separate component and add filters for age and value

const PlayersPage: FC<RouteComponentProps> = () => {
  const [nationalityFilter, updateNationalityFilter] = useState("");
  const [teamFilter, updateTeamFilter] = useState("");
  let players = usePlayers();
  useOnNewPage("Players");
  const isLoadingPlayers = useLoadingPlayers();
  const isLoadingTeams = useLoadingTeams();
  const nationalities = [...new Set(players.map(player => player.nationality))];
  const teamNames = [...new Set(players.map(player => player.team_name))];

  if (nationalityFilter) {
    players = players.filter(
      player => player.nationality === nationalityFilter
    );
  }
  if (teamFilter) {
    players = players.filter(player => player.team_name === teamFilter);
  }

  if (isLoadingPlayers || isLoadingTeams) return <Spin size="large" />;
  if (!players) return <p>No players</p>;

  return (
    <>
      <StyledForm>
        <FormItem label="Team">
          <Select
            value={teamFilter}
            style={{ width: 200 }}
            onChange={newId => {
              updateTeamFilter(newId);
            }}
          >
            {teamNames.map(value => (
              <Option value={value} key={value}>
                {value}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Nationality">
          <Select
            value={nationalityFilter}
            style={{ width: 200 }}
            onChange={newId => {
              updateNationalityFilter(newId);
            }}
          >
            {nationalities.map(value => (
              <Option value={value} key={value}>
                {value}
              </Option>
            ))}
          </Select>
        </FormItem>
      </StyledForm>
      <Players tableBodyData={players} />
    </>
  );
};

export default PlayersPage;
