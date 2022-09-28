import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Metamask from "../assets/Metamask.png";
import Alert from "react-bootstrap/Alert";
import "../styles/Header.css";

const Header = ({ active, account, connect, disconnect }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Cricket Betting Dapp</Navbar.Brand>
        <div
          onClick={active ? disconnect : connect}
          className="metamask-wrapper"
        >
          {active ? (
            <Alert variant="success">Connected to {account}</Alert>
          ) : (
            <Alert variant="warning">Connect to Metamask {">"}</Alert>
          )}
          <img src={Metamask} alt="Metamask" height={48} loading="lazy" />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
