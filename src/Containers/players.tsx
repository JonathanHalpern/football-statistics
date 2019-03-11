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
        url={`/player/${record.id}`}
      />
    )
  },
  {
    title: "Nationality",
    dataIndex: "nationality",
    sorter: (a: Player, b: Player) => (a.name > b.name ? 1 : -1)
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a: Player, b: Player) => Number(a.age) - Number(b.age)
  },
  {
    title: "Position",
    dataIndex: "position",
    sorter: (a: Player, b: Player) => (a.name > b.name ? 1 : -1)
  },
  {
    title: "Value",
    dataIndex: "value",
    sorter: (a: Player, b: Player) => Number(a.age) - Number(b.age),
    render: (text: string) => <Currency value={text} />
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
