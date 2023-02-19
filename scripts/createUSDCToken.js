const path = require('path');
var fs = require('fs');

require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });
const {
    AccountId,
    PrivateKey,
    Client,
    TokenCreateTransaction,
    Hbar
} = require("@hashgraph/sdk");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.HEDERA_OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.HEDERA_OPERATOR_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

//Create the transaction and freeze for manual signing
const transaction = await new TokenCreateTransaction()
    .setTokenName("USDC")
    .setTokenSymbol("USDC")
    .setTreasuryAccountId(operatorId)
    .setInitialSupply(10000000000000)
    .setDecimals(2)
    .setAutoRenewAccountId(operatorId)
    .setAutoRenewPeriod(11000000)
    .setMaxTransactionFee(new Hbar(11))
    .freezeWith(client);

//Sign the transaction with the token treasury account private key
const signTx = await transaction.sign(operatorKey);

const txResponse = await signTx.execute(client);

//Get the receipt of the transaction
const receipt = await txResponse.getReceipt(client);

//Get the token ID from the receipt
const tokenId = receipt.tokenId;

console.log("The new token ID is " + tokenId);

const tokenAddress = "0x" + tokenId.toSolidityAddress();

console.log(`USDC token smart contract ID in Solidity format is: ${tokenAddress} \n`);
const contractBaseLink = "https://hashscan.io/testnet/contract/";
fs.writeFileSync(
    "TokenData.json",
    JSON.stringify({
        usdcAddress: tokenAddress,
        usdcTokenContractLink: contractBaseLink + tokenId,
    }, null, 4)
);