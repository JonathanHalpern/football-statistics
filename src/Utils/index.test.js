import { removeInvalidGames } from ".";
import moment from "moment";

const games1 = [
  {
    date: moment(new Date())
      .subtract(1, "days")
      .format(),
    team_one_id: "id1",
    team_two_id: "id2",
    team_one_goals: 1,
    team_two_goals: 2
  }
];

const games2 = [
  {
    date: moment(new Date())
      .subtract(1, "days")
      .format(),
    team_one_id: "id1",
    team_two_id: "id2",
    team_one_goals: 1,
    team_two_goals: 2
  },
  {
    date: moment(new Date())
      .subtract(1, "days")
      .format(),
    team_one_id: "id1",
    team_two_id: "id1",
    team_one_goals: 1,
    team_two_goals: 2
  }
];

const games3 = [
  {
    date: moment(new Date())
      .subtract(1, "days")
      .format(),
    team_one_id: "id1",
    team_two_id: "id2",
    team_one_goals: 1,
    team_two_goals: 2
  },
  {
    date: moment(new Date())
      .subtract(1, "days")
      .format(),
    team_one_id: "id1",
    team_two_id: "id2",
    team_one_goals: -1,
    team_two_goals: 2
  },
  {
    date: moment(new Date())
      .subtract(1, "days")
      .format(),
    team_one_id: "id1",
    team_two_id: "id2",
    team_one_goals: 1,
    team_two_goals: -2
  }
];

const games4 = [
  {
    date: moment(new Date())
      .subtract(1, "days")
      .format(),
    team_one_id: "id1",
    team_two_id: "id2",
    team_one_goals: 1,
    team_two_goals: 2
  },
  {
    date: moment(new Date())
      .add(1, "days")
      .format(),
    team_one_id: "id1",
    team_two_id: "id2",
    team_one_goals: 1,
    team_two_goals: 2
  }
];
describe("Remove invalid games", () => {
  it("should not remove valid games", () => {
    const adjustedGames = removeInvalidGames(games1);
    expect(adjustedGames.length).toBe(1);
  });
  it("should remove games where the two ids are the same", () => {
    const adjustedGames = removeInvalidGames(games2);
    expect(adjustedGames.length).toBe(1);
  });

  it("should remove games where a goal score is negative", () => {
    const adjustedGames = removeInvalidGames(games3);
    expect(adjustedGames.length).toBe(1);
  });

  it("should remove games that are in the future", () => {
    const adjustedGames = removeInvalidGames(games4);
    expect(adjustedGames.length).toBe(1);
  });
});
