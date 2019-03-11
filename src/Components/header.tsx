import React, { FC } from "react";
import { Menu, Icon } from "antd";
import styled from "@emotion/styled";
import { Link } from "@reach/router";
import { useTeams } from "../Hooks";

const SubMenu = Menu.SubMenu;

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  background: white;
  z-index: 2;
  margin-bottom: 20px;
`;

const Header: FC = () => {
  const teams = useTeams();
  return (
    <Wrapper title="Football Statistics">
      <h1>Football Statistics</h1>
      <a
        href="https://github.com/JonathanHalpern/football-statistics"
        target="_blank"
      >
        Coding exercise by Jonathan Halpern
      </a>

      <Menu mode="horizontal" selectable={false}>
        <Menu.Item key="admin">
          <div>
            <Link to="/admin">
              <Icon type="form" />
              Admin
            </Link>
          </div>
        </Menu.Item>
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
        <Menu.Item key="players">
          <div>
            <Link to="/players">
              <Icon type="team" />
              Players
            </Link>
          </div>
        </Menu.Item>
      </Menu>
    </Wrapper>
  );
};
export default Header;
