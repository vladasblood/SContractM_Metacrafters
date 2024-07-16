# Titan Oil Corporation - SCM Metacrafters

This Solidity smart contract is designed as an oil management system, allowing users to extract, sell, and transfer oil while maintaining real-time transaction records. The contract includes essential functions for managing oil balances and tracking transactions through a series of events and a transaction log. Users can extract oil to increase their balance, sell oil for Ether, and transfer oil to other addresses, with each action being recorded with a timestamp. Additionally, the contract features a mechanism for emitting events to signal these actions and provides a function to retrieve the entire transaction history. The aim of this project is to showcase how to integrate a smart contract with a React frontend for a comprehensive oil management and tracking system.

## Description

The program is a streamlined smart contract system designed to manage oil transactions in a manner akin to an ATM. It facilitates operations such as extracting, selling, and transferring oil while providing real-time updates on transaction history. This smart contract enhances security by ensuring that only authorized transactions are executed and user identities are validated through blockchain technology. The automation of these processes not only boosts operational efficiency but also minimizes the potential for errors, speeding up transactions. Furthermore, the smart contract can be programmed to adhere to regulatory standards, simplifying the enforcement of compliance measures like KYC and AML. By integrating this smart contract system, the management of oil transactions is optimized for both security and efficiency, aligning with best practices in regulatory adherence.

## Getting Started

### Installing

To run this program, you must install necessary libraries and components. One may use Gitpod. However, in my case, I used my local installed visual studio code that has been installed with packages that are needed.

1. Clone this public repository.
2. Inside the project directory where the `package.json` is located, in the terminal type: `npm i`
3. Open two additional terminals in your VS code
4. In the second terminal type: `npx hardhat node`
5. In the third terminal, type: `npx hardhat run --network localhost scripts/deploy.js`
6. Back in the first terminal, type `npm run dev` to launch the front-end.

After this, the project will be running on your localhost. Typically at <http://localhost:3000/>

Last thing you need is to set up your metamask account so that you can interact with local hardhat node that you have installed.

#### To set up network

1. Navigate to the `three-dots` in the top-right of the extension.
2. Go to `settings` then navigate to `networks`.
3. Then, `add network` will redirect you to a webpage from which you can add networks manually.
4. Put necessary details like network name (i.e., any name), new rpc url (i.e., <http://127.0.0.1:8545/>), chain id (i.e., 31337), currency symbol (i.e., ETH).

#### Import Account #0 (Owner)

1. Navigate the terminal from where you have the list of all the hardhat address.
2. Copy the private key of `Account #0`.
3. Navigate again to the metamask, and search for the account tab.
4. Click `import account`.
5. Paste the previously copied private key in the field.
6. Click `import`.

### Executing program

To execute the program, begin by refreshing the website. You will then see elements such as the header, your account address, and your current oil balance. Make sure to connect your MetaMask wallet to the system to facilitate transactions between your wallet and the smart contract. 

When you use the `extract` button, MetaMask will prompt you to confirm the transfer of oil into the system, and your updated balance will be reflected immediately. 

Similarly, clicking the `sell` button will prompt MetaMask to confirm the withdrawal of oil from the system and transfer the equivalent Ether to your wallet. 

For transferring oil to another account, use the `transfer` button, which will prompt MetaMask to confirm the oil transfer between accounts. 

Each of these actions will trigger an update to the real-time transaction history, which will display details such as `timestamp`, `from`, `to`, and `amount` following a successful transaction.


## Help

### Fix Nonce Error

Nonce errors in Solidity with MetaMask occur a lot due to problems in transaction ordering and synchronizations between MetaMask and the Ethereum network. The nonce is an increasing number assigned to each transaction to prevent double-spending and ensure that all transactions are executed in the correct order.

When you encounter a problem, follow this solution

1. Open up your metamask extension
2. Navigate to the `three-dots` in the top-right of the extension.
3. Go to `settings` then navigate to `advanced`.
4. Scroll-down until you see a button named as `clear activity tab data`.

## Authors

Vladimir Al Guerrero
[@Linkedin](https://www.linkedin.com/in/vladimir-al-guerrero-178b6a24b/)

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details
