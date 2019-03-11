import moment from "moment";
import { Game } from "../Types";

export const removeInvalidGames = (games: Game[]) => {
  return games.filter(
    ({ team_one_id, team_two_id, team_one_goals, team_two_goals, date }) =>
      team_one_id !== team_two_id &&
      team_one_goals >= 0 &&
      team_two_goals >= 0 &&
      moment(date).isSameOrBefore()
  );
};
