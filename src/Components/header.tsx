import React, { FC } from "react";
import { Menu, Icon } from "antd";
import styled from "@emotion/styled";
import { Link } from "@reach/router";
import { useTeams } from "../Context";

const SubMenu = Menu.SubMenu;

type Props = {};

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  background: white;
  z-index: 2;
  margin-bottom: 20px;
`;

const Title = styled.h1``;

const Header: FC<Props> = () => {
  const teams = useTeams();
  return (
    <Wrapper title="Football Statistics">
      <Title>Football Statistics</Title>

      <Menu mode="horizontal">
        <Menu.Item key="admin">
          <Link to="/admin">
            <Icon type="form" />
            Admin
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="app">
          <Link to="/">
            <Icon type="appstore" />
            All Teams
          </Link>
        </Menu.Item> */}
        <SubMenu
          title={
            <Link to="/">
              <span className="submenu-title-wrapper">
                <Icon type="skin" />
                Teams
              </span>
            </Link>
          }
        >
          {teams.map(team => (
            <Menu.Item key={team.id}>
              <Link to={`team/${team.id}`}>{team.name} </Link>
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </Wrapper>
  );
};
export default Header;
