// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    mapping(address => uint256) public oilBalances;

    struct Transaction {
        address from;
        address to;
        uint256 amount;
        string action;
        uint256 timestamp;
    }

    Transaction[] public transactions;

    event ExtractOil(address indexed from, uint256 amount);
    event SellOil(address indexed to, uint256 amount);
    event TransferOil(address indexed from, address indexed to, uint256 amount);

    constructor(uint256 initialOil) payable {
        owner = payable(msg.sender);
        oilBalances[msg.sender] = initialOil;
    }

    function getOilBalances(address _account) public view returns (uint256) {
        return oilBalances[_account];
    }

    function extractOil(uint256 _amount) public payable {
        oilBalances[msg.sender] += _amount;
        transactions.push(Transaction({
            from: msg.sender,
            to: address(0),
            amount: _amount,
            action: "Extract",
            timestamp: block.timestamp
        }));
        emit ExtractOil(msg.sender, _amount);
    }

    function sellOil(uint256 _amount) public {
        require(oilBalances[msg.sender] >= _amount, "Insufficient balance");

        oilBalances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);

        transactions.push(Transaction({
            from: msg.sender,
            to: address(0),
            amount: _amount,
            action: "Sell",
            timestamp: block.timestamp
        }));

        emit SellOil(msg.sender, _amount);
    }

    function transferOil(address _to, uint256 _amount) public {
        require(oilBalances[msg.sender] >= _amount, "Insufficient balance");

        oilBalances[msg.sender] -= _amount;
        oilBalances[_to] += _amount;

        transactions.push(Transaction({
            from: msg.sender,
            to: _to,
            amount: _amount,
            action: "Transfer",
            timestamp: block.timestamp
        }));

        emit TransferOil(msg.sender, _to, _amount);
    }

    function getTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }
}
