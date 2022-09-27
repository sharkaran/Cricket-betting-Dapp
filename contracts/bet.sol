//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract bet {
    // uint256 constant minimumbet = 0.004;
    uint256 constant minimumbet = 4000000000000000;

    struct bet{
        uint matchId;
        address player;
        uint prediction;
    }

    struct matchBet{
        uint matchId;
        uint totalCount;
        uint total_team1_win;
        uint256 total_team1_amount;
        uint total_team2_win;
        uint256 total_team2_amount;
        uint total_tie;
        uint total_tie_amount;
        mapping(address => bet) bets;
    }

    struct bets{

    }

    // mapping()
    function betOnMatch(uint256 matchId, uint256 amount, uint prediction) public {
        
    }
}

contract matches{
    uint[] public matchIds;

    struct team{
        uint teamId;
        string name;
    }
    struct A_match{
        uint matchId;
        string matchDesc;
        string matchFormat;
        uint startDate;
        uint endDate;
        team team1;
        team team2;
    }

    struct res{
        uint matchId;
        uint result;
    }

    mapping(uint=>A_match) public schedule;
    mapping(uint => uint) public results;

    constructor () public{ 

    team memory team1 = team(185,"Denmark");
    team memory team2 = team(556,"Finland");
    A_match memory match1 = A_match(47288,"1st T20I","T20",1651914000000,1651967999000,team1,team2);

    // match 2 details
    A_match memory match2 = A_match(47290,"2nd T20I","T20",1651928400000,1651967999000,team1,team2);

    schedule[47288] = match1;
    schedule[47290] = match2;

    results[47288] = 1;
    results[47290] = 2;

    matchIds.push(47288);
    matchIds.push(47290);
    } 


    // results[47288] ;
    // results[47290] = 2;

    function getMatchIds() external view returns(uint[] memory) {
        return matchIds;
    }

    function getMatch(uint _id) external view returns(A_match memory) {
        return schedule[_id];
    }

    function getResults(uint _id) external view returns(uint) {
        return results[_id];
    }

}