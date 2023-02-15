// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SBTNFTCertificate is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string private baseURI_ = "http://defaultBaseUri.com/";

    constructor() ERC721("SoulBoundToken", "SBT") {}

    bool private contractOwnerSet;

    function setContractOwner(address flowexAddress) external {
        require(!contractOwnerSet, "Contract owner already set");
        transferOwnership(flowexAddress);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI_;
    }

    function setBaseURI(string memory _newBaseURI) internal onlyOwner {
        baseURI_ = _newBaseURI;
    }

    function safeMint(address to, string memory newBaseURI) public onlyOwner returns(uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        setBaseURI(newBaseURI);
        _safeMint(to, tokenId);
        return tokenId;
    }

    function burn(uint256 tokenId) external {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only the owner of the token can burn it."
        );
        _burn(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256,
        uint256
    ) internal pure override {
        require(
            from == address(0) || to == address(0),
            "This a Soulbound token. It cannot be transferred. It can only be burned by the token owner."
        );
    }

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }
}
