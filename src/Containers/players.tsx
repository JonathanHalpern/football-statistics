import React, { FC } from "react";
import { Table, NameWithLogo } from "../Components";
import { Player } from "../Types";
import { Currency } from "../Components";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a: Player, b: Player) => (a.name > b.name ? 1 : -1),
    render: (text: string, record: Player) => (
      <NameWithLogo
        src={record.flag_url}
        teamName={record.name}
        url={`/players/${record.id}`}
      />
    ),
    width: 300
  },
  {
    title: "Team",
    dataIndex: "team_name",
    sorter: (a: Player, b: Player) => (a.team_name > b.team_name ? 1 : -1),
    width: 150
  },
  {
    title: "Nationality",
    dataIndex: "nationality",
    sorter: (a: Player, b: Player) => (a.nationality > b.nationality ? 1 : -1),
    width: 150
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a: Player, b: Player) => Number(a.age) - Number(b.age),
    width: 100
  },
  {
    title: "Position",
    dataIndex: "position",
    sorter: (a: Player, b: Player) => (a.position > b.position ? 1 : -1),
    width: 100
  },
  {
    title: "Value",
    dataIndex: "value",
    sorter: (a: Player, b: Player) => Number(a.value) - Number(b.value),
    render: (text: string) =>
      !text || Number(text) === 0 ? "Unknown" : <Currency value={text} />
  }
];

type Props = {
  tableBodyData: Player[];
};

const Players: FC<Props> = ({ tableBodyData }) => (
  <Table
    columns={columns}
    dataSource={tableBodyData}
    rowKey="id"
    bordered
    title={() => "Players"}
  />
);

export default Players;
