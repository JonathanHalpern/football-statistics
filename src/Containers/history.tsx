import React, { FC } from "react";
import { Table } from "../Components";
import { Link } from "@reach/router";
import { Era } from "../Types";

const columns = [
  {
    title: "Team",
    dataIndex: "team_name",
    sorter: (a: Era, b: Era) => (a.team_id > b.team_id ? 1 : -1),
    render: (text: string, record: Era) => (
      <Link to={`/team/${record.team_id}`}>{record.team_name}</Link>
    )
  },
  {
    title: "Appearances",
    dataIndex: "apps",
    sorter: (a: Era, b: Era) => Number(a.apps) - Number(b.apps)
  },
  {
    title: "Goals",
    dataIndex: "goals",
    sorter: (a: Era, b: Era) => Number(a.goals) - Number(b.goals)
  }
];

type Props = {
  tableBodyData: Era[];
};

const History: FC<Props> = ({ tableBodyData }) => (
  <Table
    columns={columns}
    dataSource={tableBodyData}
    rowKey="history_id"
    bordered
    title={() => "Previous Teams"}
  />
);
export default History;
