const teams = {
  team1: {
    teamId: 185,
    name: "Denmark",
  },
  team2: {
    teamId: 556,
    name: "Finland",
  },
};

const schedule = {
  47288: {
    matchId: 47288,
    matchDesc: "1st T20I",
    matchFormat: "T20",
    startDate: 1651914000000,
    endDate: 1651967999000,
    team1: teams.team1,
    team2: teams.team2,
  },
  47290: {
    matchId: 47290,
    matchDesc: "2nd T20I",
    matchFormat: "T20",
    startDate: 1651928400000,
    endDate: 1651967999000,
    team1: teams.team1,
    team2: teams.team2,
  },
};

const matches = [47288, 47290];

const results = {
  47288: 1,
  47290: 2,
};

const getMatchIds = () => {
  return matches;
};

const getMatch = (_id) => {
  return schedule[_id];
};

const getResult = (_id) => {
  return results[_id];
};

export { getMatch, getMatchIds, getResult };
