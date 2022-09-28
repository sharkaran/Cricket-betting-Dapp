// import { getMatch, getMatchIds } from "./api";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Denmark from "./assets/Denmark.png";
import Finland from "./assets/Finland.png";
import Bet from "./components/Bet";
import "./styles/Home.css";
import { getMatchIds, getMatch } from "./contractApi";
import React from "react"

const Home = ({ account, active }) => {
  const [matchIds, setMatchIds] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const images = {
    Denmark: Denmark,
    Finland: Finland,
  };

  //   gets match ids
  useEffect(() => {
    getMatchIds()
      .then((res) => {
        const ids = res;
        setMatchIds(ids);
      })
      .catch((err) => console.log(err));
  }, []);

  //   gets matches
  useEffect(() => {
    if (matchIds.length === 0) return;
    let tempSchedule = [];
    matchIds.forEach((id) => {
      getMatch(id)
        .then((match) => {
          tempSchedule = [...tempSchedule, match];
          setSchedule(tempSchedule);
        })
        .catch((err) => console.log(err));
    });
  }, [matchIds]);

  //   convert milliseconds to readable date
  const getDate = (seconds) => {
    const date = new Date(parseInt(seconds));
    return date.toDateString();
  };

  return (
    <main className="home">
      <h2>Schedule</h2>
      <Accordion>
        {schedule.map((match, matchKey) => {
          return (
            <Accordion.Item key={matchKey} eventKey={matchKey}>
              <Accordion.Header>
                {match.team1.name} vs {match.team2.name} - {match.matchFormat}
              </Accordion.Header>
              <Accordion.Body>
                <div className="matchInfo">
                  <div className="dateWrapper">
                    <div>
                      <span>Start:</span> {getDate(match.startDate)}
                    </div>
                    <div>
                      <span>End:</span> {getDate(match.endDate)}
                    </div>
                  </div>
                  <div className="imageVSWrapper">
                    <div className="teamImageWrapper">
                      <img
                        className="teamImage"
                        src={images[match.team1.name]}
                        alt={match.team1.name}
                        loading="lazy"
                      />
                      {match.team1.name}
                    </div>
                    <span>VS</span>
                    <div className="teamImageWrapper">
                      <img
                        className="teamImage"
                        src={images[match.team2.name]}
                        alt={match.team2.name}
                        loading="lazy"
                      />
                      {match.team2.name}
                    </div>
                  </div>
                  <p className="matchDesc">
                    <span>Description:</span> {match.matchDesc}
                  </p>
                </div>
                <Bet match={match} account={account} active={active} />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </main>
  );
};

export default Home;
