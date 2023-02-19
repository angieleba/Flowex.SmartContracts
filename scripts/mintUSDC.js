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

const tokenId = process.env.USDC_CONTRACT_ID
//Mint another 1,000 tokens and freeze the unsigned transaction for manual signing
const transaction = await new TokenMintTransaction()
     .setTokenId(tokenId)
     .setAmount(1000)
     .freezeWith(client);

//Sign with the supply private key of the token 
const signTx = await transaction.sign(supplyKey);

//Submit the transaction to a Hedera network    
const txResponse = await signTx.execute(client);

//Request the receipt of the transaction
const receipt = await txResponse.getReceipt(client);
    
//Get the transaction consensus status
const transactionStatus = receipt.status;

console.log("The transaction consensus status " +transactionStatus.toString());

//v2.0.7