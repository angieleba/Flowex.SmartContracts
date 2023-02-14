// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SBTNFTCertificate is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

     string private baseURI_ = "http://defaultBaseUri.com/";
    constructor(string memory _greeting) ERC721("Flowex Cert", "FXC") {}

    bool private contractOwnerSet;

    function setContractOwner() external {
        require(!contractOwnerSet, "Contract owner already set" );
        transferOwnership(msg.sender);
    }

    function _baseURI() override internal view virtual returns (string memory) {
        return baseURI_;
    }

    function setBaseURI(string memory _newBaseURI) internal onlyOwner {
        baseURI_ = _newBaseURI;
    }

    function safeMint(address to, string memory newBaseURI) external onlyOwner returns(uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        setBaseURI(newBaseURI);
        _safeMint(to, tokenId);
        return tokenId;
    }


    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal 
    {
        require(from == address(0), "Err: token is SOUL BOUND");
        super._beforeTokenTransfer(from, to, tokenId, 1);
    }

}