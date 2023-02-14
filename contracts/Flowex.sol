// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Flowex is Ownable {
    address private ntfContract;

    
    constructor() {
        
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

    function approveProduct() external onlyOwner{
        
    }

    function addSupply() external onlyOwner{
        
    }

    function removeSupply() external onlyOwner{
        
    }

    function removeProduct() external onlyOwner{
        
    }

    function verifyProduct() external view {
        
    }

}