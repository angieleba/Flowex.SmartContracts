import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers,} from 'hardhat';
import { BigNumber, ContractTransaction, ContractReceipt } from 'ethers'
import { SBTNFTCertificate, SBTNFTCertificate__factory, Flowex, Flowex__factory } from "../typechain";

describe('Test Suite', ()=> {

    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshopt in every test.
    async function deployOnceFixture() {
        let NFT: SBTNFTCertificate__factory, nft: SBTNFTCertificate, contractOwner: SignerWithAddress, add1: SignerWithAddress, add2: SignerWithAddress, otherAccounts: SignerWithAddress[], FowlexFactory: Flowex__factory, flowex: Flowex;

        [contractOwner, add1, add2 , ...otherAccounts] = await ethers.getSigners();
        // Deploy NFT
        NFT  = await ethers.getContractFactory("SBTNFTCertificate");
        nft = await NFT.deploy();

        await nft.deployed();

        FowlexFactory  = await ethers.getContractFactory("Flowex");
        flowex = await FowlexFactory.deploy(nft.address, add1.address);

        await flowex.deployed();

        let tx = await nft.setContractOwner(flowex.address);
        await tx.wait();

        const companyName = "Timberline";
        return {nft, flowex, contractOwner, add1, add2, otherAccounts, companyName}
    }

    it("Should set the nft owner", async () => {

        const { nft, contractOwner } = await loadFixture(deployOnceFixture);

        expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should set the nft name", async () => {

        const { nft } = await loadFixture(deployOnceFixture);

        expect(await nft.name()).to.equal("Flowex Cert");
        expect(await nft.symbol()).to.equal("FXC");
    });

    it("Should not mint NFT certificate if not flowex address", async () => {

        const { nft, add1 } = await loadFixture(deployOnceFixture);

        await expect(nft.safeMint(add1.address, "https://bafybeibeqf6pfyq4fjalcwibmvmyeyt7g43w54hmlyrbtc5fbhmycbt2dy.ipfs.w3s.link/")).to.be.reverted;
        await expect(nft.connect(add1).safeMint(add1.address, "https://bafybeibeqf6pfyq4fjalcwibmvmyeyt7g43w54hmlyrbtc5fbhmycbt2dy.ipfs.w3s.link/")).to.be.reverted;
    });

    it.only("Should add product", async () => {

        const { flowex, companyName } = await loadFixture(deployOnceFixture);

        let tx = await flowex.addCompany(companyName);
        await tx.wait();
        tx = await flowex.addProdcut(companyName, 123, "Norwegian Spruce", "Hallerbos Forest", 1, "Brown", true, 35, "https://unsplash.com/photos/hf5KNXEuWp8", 42, 0);
        await tx.wait();
        const products = await flowex.getAllProducts(companyName);
        expect(products[0].productID.toNumber()).to.be.eq(123);
        expect(products[0].treeType.toString()).to.be.eq("Norwegian Spruce");
    
    });

    it.only("Should not add product for non existant company", async () => {

        const { flowex, companyName } = await loadFixture(deployOnceFixture);

        let tx = await flowex.addCompany(companyName);
        await tx.wait();
        await expect(flowex.addProdcut("Fake Company", 123, "Norwegian Spruce", "Hallerbos Forest", 1, "Brown", true, 35, "https://unsplash.com/photos/hf5KNXEuWp8", 42, 0)).to.be.reverted;
        
        
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

});