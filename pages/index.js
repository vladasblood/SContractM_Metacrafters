import { useState, useEffect } from "react";
import { ethers } from "ethers";
import assessmentAbi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [oilRig, setOilRig] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [extractOilAmount, setExtractOilAmount] = useState(0);
  const [sellOilAmount, setSellOilAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferAddress, setTransferAddress] = useState("");
  const [transferStatus, setTransferStatus] = useState("");
  const [transactions, setTransactions] = useState([]);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const oilRigABI = assessmentAbi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
    getOilRigContract();
  };

  const getOilRigContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const oilRigContract = new ethers.Contract(contractAddress, oilRigABI, signer);
    setOilRig(oilRigContract);
  };

  const getOilBalance = async () => {
    if (oilRig && account) {
      try {
        const userBalance = await oilRig.getOilBalances(account);
        setBalance(userBalance.toNumber());
      } catch (error) {
        console.error("Error fetching oil balance:", error);
      }
    }
  };

  const getTransactionHistory = async () => {
    if (oilRig) {
      try {
        const txns = await oilRig.getTransactions();
        setTransactions(txns.map(tx => ({
          from: tx.from,
          to: tx.to,
          amount: tx.amount.toNumber(),
          action: tx.action,
          timestamp: new Date(tx.timestamp * 1000).toLocaleString()
        })));
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    }
  };

  const extractOil = async () => {
    if (oilRig && account) {
      const tx = await oilRig.extractOil(extractOilAmount, { value: extractOilAmount });
      await tx.wait();
      getOilBalance();
      getTransactionHistory();
    }
  };

  const sellOil = async () => {
    if (oilRig && account) {
      const tx = await oilRig.sellOil(sellOilAmount);
      await tx.wait();
      getOilBalance();
      getTransactionHistory();
    }
  };

  const transferOil = async () => {
    if (oilRig && account) {
      try {
        const tx = await oilRig.transferOil(transferAddress, transferAmount);
        await tx.wait();
        getOilBalance();
        getTransactionHistory();
        setTransferStatus(`${transferAmount} Oil has been transferred to ${transferAddress}.`);
      } catch (error) {
        console.error("Transfer error:", error);
        setTransferStatus("Transfer failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header className="header">
        <h1 className="header-title">Titan Oil Corporation</h1>
      </header>
      {(!ethWallet) ? (
        <p>Please install MetaMask to use this Oil Rig.</p>
      ) : (!account) ? (
        <button className="connect-button" onClick={connectAccount}>Connect MetaMask</button>
      ) : (
        <div className="user-container">
          <p className="account-info">Your Account Address: {account}</p>
          <p className="balance-info">Your Oil Balance: {balance} Barrels</p>
          <div className="action-container">
            <input
              className="action-input"
              type="number"
              placeholder="Extract Oil Amount"
              value={extractOilAmount}
              onChange={(e) => setExtractOilAmount(e.target.value)}
            />
            <button className="action-button" onClick={extractOil}>Extract Oil</button>
          </div>
          <div className="action-container">
            <input
              className="action-input"
              type="number"
              placeholder="Sell Oil Amount"
              value={sellOilAmount}
              onChange={(e) => setSellOilAmount(e.target.value)}
            />
            <button className="action-button" onClick={sellOil}>Sell Oil</button>
          </div>
          <div className="action-container">
            <input
              className="action-input"
              type="number"
              placeholder="Transfer Amount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
            <input
              className="action-input"
              type="text"
              placeholder="Recipient Address"
              value={transferAddress}
              onChange={(e) => setTransferAddress(e.target.value)}
            />
            <button className="action-button" onClick={transferOil}>Transfer Oil</button>
          </div>
          <h2 className="transaction-history-heading">Transaction History</h2>
          <div className="table-container">
            <table className="transaction-history-table">
              <thead>
                <tr>
                  <th className="table-header">From</th>
                  <th className="table-header">To</th>
                  <th className="table-header">Amount (Barrels)</th>
                  <th className="table-header">Action</th>
                  <th className="table-header">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-cell">{tx.from}</td>
                    <td className="table-cell">{tx.to}</td>
                    <td className="table-cell">{tx.amount}</td>
                    <td className="table-cell">{tx.action}</td>
                    <td className="table-cell">{tx.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <style jsx>{`
        .container {
          text-align: center;
          font-family: Arial, sans-serif;
          background: #1c1c1c;
          color: #fff;
          padding: 25px;
        }
        .header {
          background-color: #ffd700;
          color: #000;
          padding: 20px;
          border-bottom: 4px solid #000;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header-title {
          font-size: 2.5rem;
          margin: 0;
          text-shadow: 2px 2px 4px #000;
        }
        .connect-button {
          background-color: #ffd700;
          color: #000;
          border: none;
          padding: 12px 25px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 20px;
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease;
        }
        .connect-button:hover {
          background-color: #e6c300;
        }
        .user-container {
          margin-top: 50px;
          background-color: #333;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .account-info {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: #ffd700;
          padding: 15px;
          background-color: rgba(255, 215, 0, 0.1); /* Light gold background */
          border: 1px solid #ffd700; /* Gold border */
          border-radius: 10px; /* Rounded corners */
        }

        .balance-info {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: #ffd700;
          padding: 15px;
          background-color: rgba(0, 128, 0, 0.1); /* Light green background */
          border: 1px solid #28a745; /* Green border */
          border-radius: 10px; /* Rounded corners */
        }

        .action-container {
          display: flex;
          justify-content: center; /* Center items horizontally */
          align-items: center; /* Center items vertically */
          margin-bottom: 15px;
        }
        .action-input {
          padding: 12px;
          width: 50%; /* Set input width to 50% */
          margin-right: 10px; /* Add space between input and button */
          border: 1px solid #ffd700;
          border-radius: 5px;
          font-size: 1rem;
          background-color: #222;
          color: #ffd700;
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }
        .action-input::placeholder {
          color: #ffd700;
          opacity: 0.7;
        }
        .action-input:focus {
          border-color: #e6c300;
          background-color: #444;
        }
        .action-button {
          background-color: #ffd700;
          color: #000;
          width: 50%; /* Set button width to 50% */
          border: none;
          padding: 12px 25px;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .action-button:hover {
          background-color: #e6c300;
          transform: translateY(-2px);
        }
        .transaction-history-heading {
          font-size: 1.5rem;
          margin-top: 30px;
          margin-bottom: 10px;
          color: #ffd700;
        }
        .table-container {
          margin-top: 20px;
        }
        .transaction-history-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          background-color: #000;
        }
        .transaction-history-table th,
        .transaction-history-table td {
          border: 1px solid #ffd700;
          padding: 12px;
          text-align: center;
          font-size: 1rem;
          color: #ffd700;
        }
        .table-header {
          background-color: #000;
          color: #000;
          font-weight: bold;
        }
        .table-row:nth-child(even) {
          background-color: #333;
        }
        .table-row:hover {
          background-color: #444;
        }
      `}</style>
    </main>
  );
}
