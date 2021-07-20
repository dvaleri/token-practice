// contacts/MyToken.sol
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC1155, Ownable {
    // Token ID's?
    uint256 public constant LOONIE = 0;
    uint256 public constant TOONIE = 1;
    uint256 public constant THE_RING = 2;

    // Token counter to create new tokens
    uint256 private currentTokenId = 3;

    constructor() ERC1155("http://127.0.0.1:8000/{id}.json") {
        _mint(msg.sender, LOONIE, 1000, "");
        _mint(msg.sender, TOONIE, 500, "");
        _mint(msg.sender, THE_RING, 1, "");
    }

    function createToken(uint256 _initialSupply) public onlyOwner returns (uint256) {
        uint256 _id = currentTokenId;
        _mint(owner(), _id, _initialSupply, "");
        currentTokenId++;
        return _id;
    }
}