import Web3 from "web3";
import betContractBuild from "contracts/bet.json";
import matchesContractBuild from "contracts/matches.json";

let provider = window.ethereum;

const web3 = new Web3(provider);

let matchesContract;
let betContract;

export const init = async () => {
  const networkId = await web3.eth.net.getId();

  matchesContract = new web3.eth.Contract(
    matchesContractBuild.abi,
    matchesContractBuild.networks[networkId].address
  );

  betContract = new web3.eth.Contract(
    betContractBuild.abi,
    betContractBuild.networks[networkId].address
  );
};

export const getMatchIds = async () => {
  if (typeof matchesContract === "undefined") await init();
  return matchesContract.methods.getMatchIds().call();
};

export const getMatch = async (_matchId) => {
  if (typeof matchesContract === "undefined") await init();
  return matchesContract.methods.getMatch(_matchId).call();
};

export const placeBet = async (_matchId, amount, prediction, account) => {
  if (typeof betContract === "undefined") await init();
  amount = Web3.utils.toWei(amount.toString(), "ether");
  console.log(_matchId, amount, prediction);
  return betContract.methods
    .betOnMatch(_matchId, amount, prediction)
    .send({ from: account });
};

export const checkBet = async (_matchId, account) => {
  if (typeof betContract === "undefined") await init();
  return betContract.methods.alreadyBet(_matchId, account).call();
};

export const availResults = async (_matchId, account) => {
  if (typeof betContract === "undefined") await init();
  return betContract.methods
    .availPrice(_matchId)
    .call()
    .sender({ from: account });
};
