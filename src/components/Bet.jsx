import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import { placeBet, checkBet } from "../contractApi";
import "../styles/Bet.css";

const Bet = ({ match, account, active }) => {
  const [alreadyPlaced, setAlreadyPlaced] = useState(false);
  const [amount, setAmount] = useState();
  const [choice, setChoice] = useState(-1);
  const [matchStatus, setMatchStatus] = useState();

  useEffect(() => {
    let x = setInterval(() => {
      let now = Math.floor(new Date().getTime());
      if (now < parseInt(match.startDate)) {
        setMatchStatus(1);
      } else if (now < parseInt(match.endDate)) {
        setMatchStatus(0);
      } else {
        setMatchStatus(-1);
      }
    }, 1000);
  }, [match.startDate, match.endDate]);

  useEffect(() => {
    if (typeof account === "undefined") {
      setAlreadyPlaced(false);
      return;
    }
    checkBet(match.matchId, account)
      .then((res) => {
        // console.log(res);
        setAlreadyPlaced(res);
      })
      .catch((err) => console.log(err));
  }, [account, match.matchId]);

  const handleChoice = (_choice) => {
    setChoice(_choice);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof account === "undefined") {
      alert("Please Connect to Metamask");
    } else if (amount < 0.004) {
      alert("Minimum Bet Amount should be 0.004ETH");
    } else if (choice === -1) {
      alert("Please select a result");
    } else {
      placeBet(match.matchId, amount, choice, account)
        .then((res) => {
          console.log(res);
          checkBet(match.matchId, account)
            .then((res) => {
              console.log(res);
              setAlreadyPlaced(res);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="betInterface">
      {/* {matchStatus} */}
      {!active ? (
        <Alert variant="warning">Connect to Metamask</Alert>
      ) : alreadyPlaced ? (
        <div className="alertWrapper">
          <Alert variant="success">You have already placed a bet!</Alert>
          {matchStatus === -1 ? (
            <Button variant="success">Avail Results!</Button>
          ) : (
            <Button variant="success" disabled>
              Come back Later!
            </Button>
          )}
        </div>
      ) : matchStatus === -1 ? (
        <Alert variant="danger">You can no longer bet</Alert>
      ) : (
        <Form onSubmit={handleSubmit} className="betForm">
          <Form.Label>Enter Bet Amount:</Form.Label>
          <InputGroup>
            <InputGroup.Text id="betAmountText">ETH</InputGroup.Text>
            <Form.Control
              aria-label="betAmount"
              aria-describedby="betAmountText"
              placeholder="0.004"
              value={amount}
              onChange={handleChange}
            />
          </InputGroup>
          <Form.Text>Minimum bet: 0.004ETH</Form.Text>
          <Form.Group>
            <Form.Label>Choose Result:</Form.Label>
            <div className="resultWrapper">
              <Button
                className="resultSelect"
                variant="outline-warning"
                active={choice === 1}
                onClick={() => handleChoice(1)}
              >
                {match.team1.name}
              </Button>
              <Button
                className="resultSelect"
                variant="outline-warning"
                active={choice === 0}
                onClick={() => handleChoice(0)}
              >
                Draw
              </Button>
              <Button
                className="resultSelect"
                variant="outline-warning"
                active={choice === 2}
                onClick={() => handleChoice(2)}
              >
                {match.team2.name}
              </Button>
            </div>
          </Form.Group>
          <Button variant="danger" type="submit" className="placeBetBtn">
            Place a Bet!
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Bet;
