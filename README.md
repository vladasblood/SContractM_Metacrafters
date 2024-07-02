# Simple Smart Contract Management - Metacrafters

The program is set to clone the current starter template of the SCM project, then with additional 2 functions. In this case, since the concept of the smart contract is ATM so it will include interest rates and real-time transaction history. The purpose of the project was to demonstrate on how to connect a React frontend with your smart contract management system.

## Description

The program is a simple smart contract management that revolves around the concept of ATM. It can return values that are dictated for accrued interest rates and transaction records. Basically, ATM smart contract management brings vast improvements in security, automated executions, and compliance with regulations. Through blockchain, smart contracts are hardwired with security strictures, making sure that just authenticated transactions are processed and user identity is confirmed. Automation of transaction processes streamlines operations, reducing the likelihood of potential errors and enhancing speed in transactions. The further step could be programming smart contracts to enforce regulatory standards by themselves, hence making it easier to track the adherence to laws like KYC and AML. Altogether, the integration of smart contract management in the operation of ATMs enhances the efficiency and security of regulatory compliance.

## Getting Started

### Installing

To run this program, you must install necessary libraries and components. One may use Gitpod. However, in my case, I used my local installed visual studio code that has been installed with packages that are needed.

1. Clone this public repository.
2. Inside the project directory, in the terminal type: `npm i`
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

Once you are ready to execute the program, refresh the website.

Inside the website, you will text views such as header, your account address, and your balance in the system. But before that, you must connect your metamask to the system so that it has guaranteed transactions vice-versa with the respective account that you will use.

When using the `deposit` button, the metamask will prompt a confirmation that you want to transfer your ETH to the system balance of the ATM, from which it will instantly reflect on how much you have transferred.

Same with the `withdraw` button, the metamask will prompt a confirmation that you want to withdraw your ATM balance back to your wallet.

You can observe that a real-time transaction history is always refresh when a transaction has been successful. It will include details such as `timestamp`, `from`, `to` and `amount`.

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
