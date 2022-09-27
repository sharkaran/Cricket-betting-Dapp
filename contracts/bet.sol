pragma solidity 0.8.17;

contract bet {
    constant minimumbet = 0.004;

    mapping()
    function betOnMatch(uint256 matchId, uint256 amount, uint prediction) public {
        
    }
}

contract matches{
    uint[] public matches;

    struct team{
        uint teamId;
        string name
    }
    struct match {
        uint matchId;
        string matchDesc;
        string matchFormat;
        uint startDate;
        uint endDate;
        team team1;
        team team2;
    }

    mapping(uint=>uint) public results;

    mapping(uint=>match) public schedule;

// match 1 details
    team team1 = team(185,"Denmark");
    team team2 = team(556,"Finland");
    match match1 = match(47288,"1st T20I","T20",1651914000000,1651967999000,team1,team2);

// match 2 details
    match match2 = match(47290,"2nd T20I","T20",1651928400000,1651967999000,team1,team2);

    schedule[47288] = match1;
    schedule[47290] = match2;

    results[47288] = 1;
    results[47290] = 2;

    function getMatchIds() public view returns(uint[]) external {
        return matches;
    }

    function getMatch(uint _id) public view returns(match) external {
        return schedule[_id];
    }

    function getResults(uint _id) public view returns(uint) external{
        return results[_id];
    }

}