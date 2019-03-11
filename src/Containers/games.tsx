import React, { FC } from "react";
import Moment from "react-moment";
import moment from "moment";
import { Table } from "../Components";
import { Link } from "@reach/router";
import { Game } from "../Types";

const columns = [
  {
    title: "Vs",
    dataIndex: "team_two_name",
    sorter: (a: Game, b: Game) => (a.team_two_name > b.team_two_name ? 1 : -1),
    render: (text: string, record: Game) => (
      <Link to={`/team/${record.team_two_id}`}>{record.team_two_name}</Link>
    )
  },
  {
    title: "Result",
    dataIndex: "result",
    sorter: (a: Game, b: Game) => (a.result > b.result ? 1 : -1)
  },
  {
    title: "Venue",
    dataIndex: "home",
    sorter: (a: Game, b: Game) => (a.home > b.home ? 1 : -1),
    render: (isHome: boolean) => (isHome ? "Home" : "Away")
  },
  {
    title: "Match date",
    dataIndex: "date",
    sorter: (a: Game, b: Game) => moment(b.date).unix() - moment(a.date).unix(),
    render: (text: string, record: Game) => (
      <Moment format="DD/MM/YYYY">{text}</Moment>
    )
  },
  {
    title: "Goals scored",
    dataIndex: "team_one_goals",
    sorter: (a: Game, b: Game) =>
      Number(a.team_one_goals) - Number(b.team_one_goals)
  },
  {
    title: "Goals conceded",
    dataIndex: "team_two_goals",
    sorter: (a: Game, b: Game) =>
      Number(a.team_two_goals) - Number(b.team_two_goals)
  }
];

type Props = {
  tableBodyData: Game[];
};

const Games: FC<Props> = ({ tableBodyData }) => (
  <Table
    columns={columns}
    dataSource={tableBodyData}
    rowKey="id"
    bordered
    title={() => "Matches"}
  />
);
export default Games;
