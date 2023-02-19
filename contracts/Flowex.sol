// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./Interfaces/INFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Flowex is Ownable, IERC721Receiver {
    address private ntfContract;
    address qaAddress;
    INFT inft;
    constructor(address _nftContractAddress, address _qaAddress ) {
        inft = INFT(_nftContractAddress);
        qaAddress = _qaAddress;
    }

    enum WoodType {
        SawLog,
        PulpWood,
        Biomass       
    }

    enum Shade{
        Light,
        Medium,
        Dark
    }

    enum Unit {
        CBM,
        CFT
    }

    struct Product {
        uint256 productID;
        string treeType;
        string location;
        WoodType woodType;
        string colour;
        bool isRaw;
        uint256 pricePerUnit;
        string photo;
        uint256 amount;
        Unit unit;
        bool approved;
    }

    event AddSupply(
        uint256 amount,
        uint256 timestamp,
        uint256 latitude,
        uint256 longitude
    );

    event RemoveSupply(
        uint256 amount,
        uint256 timestamp
    );

    // product ID => token ID
    mapping (uint256=>uint256) certificates;

    mapping (string => Product[]) companyToProducts;
    mapping (string => bool) supplierCompanies;

    modifier notRegistered(string memory companyName) {
        require(!supplierCompanies[companyName], "Company already registered");
        _;
    }

    modifier registered(string memory companyName) {
        require(supplierCompanies[companyName], "Company not registered");
        _;
    }
    
    function addCompany(string memory companyName) external notRegistered(companyName){
        supplierCompanies[companyName] = true;
    }

    function disapproveCompany(string memory companyName) external registered(companyName){
        supplierCompanies[companyName] = false;
        delete companyToProducts[companyName];
    }

    function addProduct(
        string memory _companyName,
        uint256 _productID,
        string memory _treeType,
        string memory _location,
        WoodType _woodType,
        string memory _colour,
        bool _isRaw,
        uint256 _pricePerUnit,
        string memory _photo,
        uint256 _amount,
        Unit _unit
    ) external onlyOwner registered(_companyName){
        companyToProducts[_companyName].push(Product(_productID, _treeType, _location, _woodType, _colour, _isRaw, _pricePerUnit, _photo, _amount, _unit, false));
    }

    function chcekProductID(string memory companyName, uint256 productIndex, uint256 productID) public view{
         uint256 expectedProductId = companyToProducts[companyName][productIndex].productID;
        require(productID == expectedProductId, "Wrong product ID");
    }

    function approveProduct(
        bytes32 _hashedMessage,
        uint8 _v,
        bytes32 _r,
        bytes32 _s,
        uint256 productIndex,
        uint256 productID,
        string memory companyName,
        string memory baseURI
        ) external onlyOwner{
            bytes memory prefix = "\x19Ethereum Signed Message:\n32";
            bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
            address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
            require(signer == qaAddress, "Not signed by QA");
            chcekProductID(companyName, productIndex, productID);
            companyToProducts[companyName][productIndex].approved = true;
            uint256 tokenId = inft.safeMint(address(this), baseURI);
            certificates[productID] = tokenId;
    }

    function addSupply (
        uint256 amount,
        uint256 timestamp,
        uint256 latitude,
        uint256 longitude,
        uint256 productIndex, 
        uint256 productID,
        string memory companyName
    ) external onlyOwner registered(companyName){
        chcekProductID(companyName, productIndex, productID);
        companyToProducts[companyName][productIndex].amount += amount;
        emit AddSupply(
            amount,
            timestamp,
            latitude,
            longitude
        );
    }

    function removeSupply(
        uint256 amount,
        uint256 productIndex, 
        uint256 productID,
        string memory companyName
    ) external onlyOwner registered(companyName){
        chcekProductID(companyName, productIndex, productID);
        companyToProducts[companyName][productIndex].amount -= amount;
        emit RemoveSupply(
            amount,
            block.timestamp
        );
    }

    function removeProduct(
        uint256 productIndex, 
        uint256 productID,
        string memory companyName
    ) external onlyOwner registered(companyName){
        chcekProductID(companyName, productIndex, productID);
        delete companyToProducts[companyName];
    }

    function verifyProductCertificate(uint256 productId) external view returns(uint256){
        return certificates[productId];
    }

    function getAllProducts(string memory companyName) external view returns(Product[] memory) {
        return companyToProducts[companyName];
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }


}