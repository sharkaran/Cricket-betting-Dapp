import { getMatch, getMatchIds } from "./api";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Denmark from "./assets/Denmark.png";
import Finland from "./assets/Finland.png";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./styles/Home.css";

const Home = () => {
  const [matchIds, setMatchIds] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const images = {
    Denmark: Denmark,
    Finland: Finland,
  };

  useEffect(() => {
    const ids = getMatchIds();
    setMatchIds(ids);
  }, []);

  useEffect(() => {
    if (matchIds.length === 0) return;
    const tempSchedule = [];
    matchIds.forEach((id) => {
      const match = getMatch(id);
      tempSchedule.push(match);
    });
    setSchedule(tempSchedule);
  }, [matchIds]);

  const getDate = (seconds) => {
    const date = new Date(seconds);
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
                <div className="dateWrapper">
                  <span>Start Date: {getDate(match.startDate)}</span>
                  <span>End Date: {getDate(match.endDate)}</span>
                </div>
                <div className="imageVSWrapper">
                  <div className="teamImageWrapper">
                    <img
                      className="teamImage"
                      src={images[match.team1.name]}
                      alt={match.team1.name}
                      loading="lazy"
                    />
                    <h4>{match.team1.name}</h4>
                  </div>
                  <span>VS</span>
                  <div className="teamImageWrapper">
                    <img
                      className="teamImage"
                      src={images[match.team2.name]}
                      alt={match.team2.name}
                      loading="lazy"
                    />
                    <h4>{match.team2.name}</h4>
                  </div>
                </div>
                <p>Description: {match.matchDesc}</p>
                <Link to={`bets/${match.matchId}`}>
                  <Button variant="outline-warning">Place a Bet!</Button>
                </Link>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </main>
  );
};

export default Home;
