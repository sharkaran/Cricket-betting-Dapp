//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract bet {
    // uint256 constant minimumbet = 0.004;
    uint256 constant minimumBet = 4000000000000000;

    struct Bet {
        uint256 matchId;
        address player;
        uint256 prediction;
        uint256 bet_time;
    }

    struct MatchBet {
        uint256 matchId;
        uint256 totalCount;
        uint256 total_team1_win;
        uint256 total_team1_amount;
        uint256 total_team2_win;
        uint256 total_team2_amount;
        uint256 total_tie;
        uint256 total_tie_amount;
        mapping(address => Bet) bets;
        mapping(address => bool) players;
    }

    // storing all match bet detials
    mapping(uint256 => MatchBet) allBets;
    mapping(uint256 => bool) startedBet;
    uint256 total_games = 0;

    matches game = new matches();

    // checks if player had already bet on given match
    function alreadyBet(uint256 matchId, address user)
        public
        view
        returns (bool)
    {
        return allBets[matchId].players[user];
    }

    function betOnMatch(
        uint256 matchId,
        uint256 amount,
        uint256 prediction
    ) public payable {
        // player must not bet more than once on a particuar match
        require(
            !allBets[matchId].players[msg.sender],
            "you have alredy placed a bet on this match"
        );
        require(
            block.timestamp <= (game.getMatch(matchId).endDate - 86400),
            "The duration of bettig on this Match is over."
        );

        // bet amount should be equal to or greater than minimumBet
        require(
            amount >= minimumBet,
            "Please send atleast minimum amount to bet"
        ); // ether in wei

        Bet memory bet1 = Bet(matchId, msg.sender, prediction, block.timestamp);

        // first bet on a match
        if (!startedBet[matchId]) {
            startedBet[matchId] = true;
            total_games++;

            MatchBet storage match1 = allBets[matchId];

            match1.matchId = matchId;
            match1.totalCount = 1;
            match1.bets[msg.sender] = bet1;
            match1.players[msg.sender] = true;

            if (prediction == 1) {
                match1.total_team1_win = 1;
                match1.total_team1_amount = amount;
                match1.total_team2_win = 0;
                match1.total_team2_amount = 0;
                match1.total_tie = 0;
                match1.total_tie_amount = 0;
            } else if (prediction == 2) {
                match1.total_team1_win = 0;
                match1.total_team1_amount = 0;
                match1.total_team2_win = 1;
                match1.total_team2_amount = amount;
                match1.total_tie = 0;
                match1.total_tie_amount = 0;
            } else if (prediction == 0) {
                match1.total_team1_win = 0;
                match1.total_team1_amount = 0;
                match1.total_team2_win = 0;
                match1.total_team2_amount = 0;
                match1.total_tie = 1;
                match1.total_tie_amount = amount;
            }

            // if(prediction==1){
            //     match1 = MatchBet(matchId,1,1,amount,0,0,0,0,bet1, true);
            // }
            // else if(prediction==2){
            //     match1 = MatchBet(matchId,1,0,0,1,amount,0,0,bet1, true);
            // }
            // else if(prediction=0){
            //     match1 = MatchBet(matchId,1,0,0,0,0,1,amount,bet1, true);
            // }

            // allBets[matchId]  = match1;
        } else {
            MatchBet storage match2;
            match2 = allBets[matchId];

            if (matchId == match2.matchId) {
                match2.matchId = matchId;
                match2.totalCount += 1;
                match2.bets[msg.sender] = bet1;
                match2.players[msg.sender] = true;

                if (prediction == 1) {
                    match2.total_team1_win += 1;
                    match2.total_team1_amount += amount;
                } else if (prediction == 2) {
                    match2.total_team2_win += 1;
                    match2.total_team2_amount += amount;
                } else if (prediction == 0) {
                    match2.total_tie += 1;
                    match2.total_tie_amount += amount;
                }
            }
        }
    }
}

contract matches {
    uint256[] public matchIds;

    struct Team {
        uint256 teamId;
        string name;
    }
    struct A_match {
        uint256 matchId;
        string matchDesc;
        string matchFormat;
        uint256 startDate;
        uint256 endDate;
        Team team1;
        Team team2;
    }

    struct Res {
        uint256 matchId;
        uint256 result;
    }

    mapping(uint256 => A_match) public schedule;
    mapping(uint256 => uint256) public results;

    constructor() {
        Team memory team1 = Team(185, "Denmark");
        Team memory team2 = Team(556, "Finland");
        A_match memory match1 = A_match(
            47288,
            "1st T20I",
            "T20",
            1651914000000,
            1651967999000,
            team1,
            team2
        );

        // match 2 details
        A_match memory match2 = A_match(
            47290,
            "2nd T20I",
            "T20",
            1651928400000,
            1651967999000,
            team1,
            team2
        );

        schedule[47288] = match1;
        schedule[47290] = match2;

        results[47288] = 1;
        results[47290] = 2;

        matchIds.push(47288);
        matchIds.push(47290);
    }

    // results[47288] ;
    // results[47290] = 2;

    function getMatchIds() external view returns (uint256[] memory) {
        return matchIds;
    }

    function getMatch(uint256 _id) external view returns (A_match memory) {
        return schedule[_id];
    }

    function getResults(uint256 _id) external view returns (uint256) {
        return results[_id];
    }
}
