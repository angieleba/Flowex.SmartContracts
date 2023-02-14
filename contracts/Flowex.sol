// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Flowex is Ownable {
    address private ntfContract;
    address qaAddress;
    
    constructor(address _nftContractAddress, ) {
        
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

    function addProdcut(
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

    function chcekProductID(uint256 productIndex, uint256 productID) internal pure{
         uint256 expectedProductId = companyToProducts[companyName][companyIndex].productID;
        require(productId == expectedProductId, "Wrong product ID");
    }

    function approveProduct(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s, uint256 productIndex, uint256 productID, string memory companyName) external onlyOwner{
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        require(signer == qaAddress, "Not signed by QA");
        chcekProductID(productIndex, productID);
        companyToProducts[companyName][companyIndex].approved = true;
    }

    function addSupply(
        uint256 amount,
        uint256 timestamp,
        uint256 latitude,
        uint256 longitude,
        uint256 productIndex, 
        uint256 productID.
        string memory companyName
    ) external onlyOwner{
        chcekProductID(productIndex, productID);
        companyToProducts[companyName][companyIndex].amount += amount;
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
        uint256 productID.
        string memory companyName
    ) external onlyOwner{
        chcekProductID(productIndex, productID);
        companyToProducts[companyName][companyIndex].amount -= amount;
        emit RemoveSupply(
            amount,
            block.timestamp
        );
    }

    function removeProduct() external onlyOwner{
        chcekProductID(productIndex, productID);
        companyToProducts[companyName][companyIndex].amount += amount;
        emit AddSupply(
            amount,
            timestamp,
            latitude,
            longitude
        );
    }

    function verifyProduct() external view {
        
    }

    function getAllProducts(string memory companyName) external view returns(memory [] Product) {
        return companyToProducts[compannyName];
    }


}