import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Metamask from "../assets/Metamask.png";
import "../styles/Header.css";
import React from "react"

const Header = ({ active, account, connect, disconnect }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Cricket Betting Dapp</Navbar.Brand>
        <div
          onClick={active ? disconnect : connect}
          className="metamask-wrapper"
        >
          <span className="text-light">
            {active ? `Connected to ${account}` : "Not Connected"}
          </span>
          <img src={Metamask} alt="Metamask" height={48} loading="lazy" />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
