export type Era = {
  team_id: string;
  team_name: string;
  apps: number;
  goals: number;
};

export type Team = {
  budget: string;
  city: string;
  colour: string;
  founded: string;
  id: string;
  logo_url: string;
  name: string;
};

export type Player = {
  name: string;
  age: string;
  flag_url: string;
  history: Era[];
  id: string;
  key: string;
  nationality: string;
  position: string;
  team_id: string;
  team_name: string;
  value: string;
};

export type Game = {
  id: string;
  team_one_id: string;
  team_two_id: string;
  team_one_goals: number;
  team_two_goals: number;
  team_two_name: string;
  date: string;
  home: boolean;
  result: string;
  points: number;
};

export type AppContext = {
  teams: Team[];
  players: Player[];
  games: Game[];
};
