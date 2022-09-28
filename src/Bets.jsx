import { useParams } from "react-router-dom";

const Bets = () => {
  const params = useParams();
  return <div>Bets {params.id}</div>;
};

export default Bets;
