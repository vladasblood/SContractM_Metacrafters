import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [loadingTransactionHistory, setLoadingTransactionHistory] = useState(true);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const checkMetaMask = async () => {
    if (window.ethereum) {
      await connectMetaMask();
    } else {
      console.error("MetaMask is not installed");
    }
  };

  const connectMetaMask = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setEthWallet(provider);
      const accounts = await provider.listAccounts();
      handleAccount(accounts);
    } catch (error) {
      console.error("Error connecting MetaMask:", error);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
      initializeATMContract();
    } else {
      console.log("No account found");
    }
  };

  const initializeATMContract = () => {
    if (!ethWallet) return;

    const signer = ethWallet.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
    console.log("ATM Contract initialized:", atmContract.address);

    // Attempt to get balance and transaction history
    getBalance();
    fetchTransactionHistory();
  };

  const getBalance = async () => {
    if (!atm) return;

    try {
      setLoadingBalance(true);
      const balance = await atm.getBalance();
      console.log("Balance fetched:", balance.toString());
      setBalance(balance.toString());
      setLoadingBalance(false);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setLoadingBalance(false);
    }
  };

  const deposit = async () => {
    if (!atm) return;

    try {
      let tx = await atm.deposit(ethers.utils.parseEther("1.0"));
      await tx.wait();
      getBalance();
      fetchTransactionHistory();
    } catch (error) {
      console.error("Error depositing:", error);
    }
  };

  const withdraw = async () => {
    if (!atm) return;

    try {
      let tx = await atm.withdraw(ethers.utils.parseEther("1.0"));
      await tx.wait();
      getBalance();
      fetchTransactionHistory();
    } catch (error) {
      console.error("Error withdrawing:", error);
    }
  };

  const fetchTransactionHistory = async () => {
    if (!atm) return;

    try {
      setLoadingTransactionHistory(true);

      // Fetch the length of transaction history
      const length = await atm.getTransactionHistoryLength();
      console.log("Transaction history length:", length.toNumber());

      // Fetch each transaction using the index
      const transactions = [];
      for (let i = 0; i < length; i++) {
        const txn = await atm.getTransaction(i);
        transactions.push({
          timestamp: new Date(txn[0] * 1000).toLocaleString(),
          from: txn[1],
          to: txn[2],
          amount: ethers.utils.formatEther(txn[3]),
        });
      }

      console.log("Transaction history:", transactions);
      setTransactionHistory(transactions);
      setLoadingTransactionHistory(false);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      setLoadingTransactionHistory(false);
    }
  };

  useEffect(() => {
    checkMetaMask();
  }, []);

  useEffect(() => {
    if (ethWallet) {
      initializeATMContract();
    }
  }, [ethWallet]);

  return (
    <main className="container">
      <header><h1>View Your Transaction, Deposit, Withdraw ATM!</h1></header>
      {ethWallet && account ? (
        <div>
          <p>Your Account: {account}</p>
          <p>Your Balance: {loadingBalance || balance === undefined ? 'Loading...' : ethers.utils.formatEther(balance)} ETH</p>
          <button onClick={deposit} disabled={!atm}>Deposit 1 ETH</button>
          <button onClick={withdraw} disabled={!atm}>Withdraw 1 ETH</button>

          <div>
            <h2>Transaction History</h2>
            {loadingTransactionHistory ? (
              <p>Loading transaction history...</p>
            ) : (
              <ul>
                {transactionHistory.map((tx, index) => (
                  <li key={index}>
                    <br/>
                    <strong>Timestamp:</strong> {tx.timestamp}<br />
                    <strong>From:</strong> {tx.from}<br />
                    <strong>To:</strong> {tx.to}<br />
                    <strong>Amount:</strong> {tx.amount} ETH
                    <br/>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <p>Please install MetaMask and connect to use this ATM.</p>
      )}
      <style jsx>{`
        .container {
          text-align: center;
          margin-top: 50px;
        }
        button {
          margin: 10px;
        }
      `}</style>
    </main>
  );
}
