const { Web3 } = require("web3");

require("dotenv").config();

const web3 = new Web3(process.env.BLOCKCHAIN_URL);

exports.storeSOSData = async (sosData) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; // Use the first account

        const transaction = await web3.eth.sendTransaction({
            from: sender,
            to: "0xRecipientWalletAddress", // Replace with actual blockchain address
            data: web3.utils.toHex(JSON.stringify(sosData)),
            gas: 2000000, // Set appropriate gas limit
        });

        return transaction.transactionHash;
    } catch (error) {
        console.error("Blockchain Error:", error);
        throw error;
    }
};
