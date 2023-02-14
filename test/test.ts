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

        return {nft, flowex, contractOwner, add1, add2, otherAccounts}
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

    it.only("Should not mint NFT certificate if not flowex address", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        await expect(nft.safeMint(add1.address, "https://bafybeibeqf6pfyq4fjalcwibmvmyeyt7g43w54hmlyrbtc5fbhmycbt2dy.ipfs.w3s.link/")).to.be.reverted;
        await expect(nft.connect(add1).safeMint(add1.address, "https://bafybeibeqf6pfyq4fjalcwibmvmyeyt7g43w54hmlyrbtc5fbhmycbt2dy.ipfs.w3s.link/")).to.be.reverted;
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

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

    it("Should ", async () => {

        const { nft, flowex, contractOwner, add1, add2, otherAccounts } = await loadFixture(deployOnceFixture);

        // expect(await nft.owner()).to.equal(contractOwner.address);
    });

});