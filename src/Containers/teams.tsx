import React, { FC } from "react";
import { Table, Logo, NameWithLogo } from "../Components";

import { Team } from "../Types";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a: Team, b: Team) => (a.name > b.name ? 1 : -1),
    render: (text: string, record: Team) => (
      <NameWithLogo
        src={record.logo_url}
        teamName={record.name}
        url={`/team/${record.id}`}
      />
    )
  },
  {
    title: "City",
    dataIndex: "city",
    sorter: (a: Team, b: Team) => (a.city > b.city ? 1 : -1)
  },
  {
    title: "Budget",
    dataIndex: "budget",
    sorter: (a: Team, b: Team) => Number(a.budget) - Number(b.budget)
  },
  {
    title: "Founded",
    dataIndex: "founded",
    sorter: (a: Team, b: Team) => Number(a.founded) - Number(b.founded)
  }
];

type Props = {
  tableBodyData: Team[];
};

const Teams: FC<Props> = ({ tableBodyData }) => (
  <Table
    columns={columns}
    dataSource={tableBodyData}
    rowKey="id"
    bordered
    title={() => "Teams"}
  />
);
export default Teams;
