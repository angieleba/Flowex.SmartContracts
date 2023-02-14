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
    
    function addProdcut() external onlyOwner{
        
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