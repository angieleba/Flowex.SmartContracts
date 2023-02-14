const path = require('path');
const { writeFile } = require('fs');

require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });
const nftABIDetails = require('../artifacts/contracts/SBTNFTCertificate.sol/SBTNFTCertificate.json');
const flowexABIDetails = require('../artifacts/contracts/Flowex.sol/Flowex.json');
const {
	AccountId,
	PrivateKey,
	Client,
	// FileCreateTransaction,
	// ContractCreateTransaction,
	ContractFunctionParameters,
	ContractExecuteTransaction,
	// ContractCallQuery,
	// Hbar,
	ContractCreateFlow,
} = require("@hashgraph/sdk");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.HEDERA_OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.HEDERA_OPERATOR_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const qaAddress = process.env.QA_ADDRESS;

async function main() {
	// Import the compiled contract bytecode
	const nftContractBytecode = nftABIDetails.bytecode.slice(2);
	const flowexContractBytecode = flowexABIDetails.bytecode.slice(2);


	// Instantiate the smart contract
	let contractInstantiateTx = new ContractCreateFlow()
		.setBytecode(nftContractBytecode)
		.setGas(200000);

	let contractInstantiateSubmit = await contractInstantiateTx.execute(client);
	let contractInstantiateRx = await contractInstantiateSubmit.getReceipt(client);
	let contractId = contractInstantiateRx.contractId;
	let contractAddress = contractId.toSolidityAddress();
	const nftContractId = contractId;
	console.log(`The Soulbound NFT certificate smart contract ID is: ${contractId} \n`);
	const nftAddress = "0x" + contractAddress;
	console.log(`The Soulbound NFT certificate smart contract ID in Solidity format is: ${nftAddress} \n`);
	

	contractInstantiateTx = new ContractCreateFlow()
		.setBytecode(flowexContractBytecode)
		.setGas(500000)
		.setConstructorParameters(
			new ContractFunctionParameters()
			.addAddress(nftAddress)
			.addAddress(qaAddress)
		);

	contractInstantiateSubmit = await contractInstantiateTx.execute(client);
	contractInstantiateRx = await contractInstantiateSubmit.getReceipt(client);
	contractId = contractInstantiateRx.contractId;
	contractAddress = contractId.toSolidityAddress();
	console.log(`The Flowex smart contract ID is: ${contractId} \n`);
	const flowexAddress = "0x" + contractAddress;
	console.log(`The Flowex smart contract ID in Solidity format is: ${flowexAddress} \n`);
	const contractBaseLink = "https://hashscan.io/testnet/contract/";
	await writeFile(
		"./data.json",
		JSON.stringify({
		  nftAddress: nftAddress,
		  nftContractLink: contractBaseLink+nftContractId,
		  flowexAddress: flowexAddress,
		  flowexContractLink: contractBaseLink+contractId,
		}),
		null,
		4
	  );
	

}
main();