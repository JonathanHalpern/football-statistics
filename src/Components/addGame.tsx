import React, { FC, useState, SyntheticEvent } from "react";
import moment from "moment";
import { useFetchAll } from "../Context";
import { addAGame } from "../Api";
import { Team } from "../Types";

import { Form, DatePicker, Button, Select, InputNumber, message } from "antd";
const FormItem = Form.Item;

const Option = Select.Option;

type Props = {
  teams: Team[];
};

const AddGame: FC<Props> = ({ teams }) => {
  const fetchAll = useFetchAll();
  const [momentDate, updateMomentDate] = useState(moment());
  const [team_one_id, updateTeamOneId] = useState("");
  const [team_two_id, updateTeamTwoId] = useState("");
  const [team_one_goals, updateTeamOneGoals] = useState(0);
  const [team_two_goals, updateTeamTwoGoals] = useState(0);
  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const game = {
      date: momentDate.format(),
      team_one_id,
      team_two_id,
      team_one_goals,
      team_two_goals
    };
    const response = await addAGame(game);
    console.log(response);
    if (response.success) {
      fetchAll();
      updateTeamOneId("");
      updateTeamTwoId("");
      updateTeamOneGoals(0);
      updateTeamTwoGoals(0);
      message.success("Game added successfully");
    } else {
      message.error(`There was a problem adding your game: ${response.error}`);
    }
  };
  const isEntryValid = (entry: any) => Number.isInteger(entry) && entry > 0;

  const disabledDate = (current: moment.Moment | undefined) =>
    current ? current.isAfter() : false;
  return (
    <Form layout="horizontal" onSubmit={onSubmit}>
      <p>Add a Game</p>

      <FormItem label="Match Date">
        <DatePicker
          disabledDate={disabledDate}
          value={momentDate}
          onChange={newDate => {
            (!newDate || (newDate && newDate.isSameOrBefore())) &&
              updateMomentDate(newDate);
          }}
        />
      </FormItem>
      <FormItem label="Home Team">
        <Select
          value={team_one_id}
          style={{ width: 200 }}
          onChange={newId => {
            updateTeamOneId(newId);
          }}
        >
          {teams
            .filter(({ id }) => id !== team_two_id)
            .map(team => (
              <Option value={team.id} key={team.id}>
                {team.name}
              </Option>
            ))}
        </Select>
      </FormItem>
      <FormItem label="Home team goals">
        <InputNumber
          min={0}
          value={team_one_goals}
          style={{ width: 60 }}
          onChange={newValue => {
            newValue && isEntryValid(newValue)
              ? updateTeamOneGoals(newValue)
              : updateTeamOneGoals(0);
          }}
        />
      </FormItem>
      <FormItem label="Away Team">
        <Select
          value={team_two_id}
          style={{ width: 200 }}
          onChange={newId => {
            updateTeamTwoId(newId);
          }}
        >
          {teams
            .filter(({ id }) => id !== team_one_id)
            .map(team => (
              <Option value={team.id} key={team.id}>
                {team.name}
              </Option>
            ))}
        </Select>
      </FormItem>
      <FormItem label="Away team goals">
        <InputNumber
          min={0}
          value={team_two_goals}
          style={{ width: 60 }}
          onChange={newValue => {
            newValue && isEntryValid(newValue)
              ? updateTeamOneGoals(newValue)
              : updateTeamOneGoals(0);
          }}
        />
      </FormItem>
      <Button
        type="primary"
        htmlType="submit"
        disabled={!(momentDate && team_one_id && team_two_id)}
      >
        Submit
      </Button>
    </Form>
  );
};
export default AddGame;
