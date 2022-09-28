import "./styles/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Home";
import Bets from "./Bets";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="bets/:id" element={<Bets />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
