import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Metamask from "../assets/Metamask.png";
import "../styles/Header.css";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";

const Header = () => {
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.log(err);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (err) {
      console.log(err);
    }
  };

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
