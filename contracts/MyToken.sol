// contacts/MyToken.sol
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MyToken is ERC1155 {
    // Token ID's?
    uint256 public constant LOONIE = 0;
    uint256 public constant TOONIE = 1;
    uint256 public constant THE_RING = 2;

    constructor() ERC1155('') {
        _mint(msg.sender, LOONIE, 1000, "");
        _mint(msg.sender, TOONIE, 500, "");
        _mint(msg.sender, THE_RING, 1, "");
    }
}