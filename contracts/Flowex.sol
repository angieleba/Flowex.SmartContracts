// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Flowex {
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
        Shade shade;
        bool isRaw;
        uint256 pricePerUnit;
        string photo;
        uint256 amount;
        Unit unit;
    }

    mapping (string => Product[]) companyToProducts;



}