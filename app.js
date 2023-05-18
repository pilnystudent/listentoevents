const ethers = require("ethers");
const abi = require('./tangiblemarketplace.abi.json');

const provider = new ethers.providers.WebSocketProvider(`wss://polygon-mainnet.g.alchemy.com/v2/pnpmjWAukN3uWbPxt-ukZMMiyIvAXLYL`);
const usdc = new ethers.Contract("0x43e656716cF49C008435A8196d8f825f66f37254", abi, provider);

usdc.on("MarketItemCreated", (tokenId, seller, paymentToken, price, event) => {
    console.log({
        tokenId: tokenId,
        seller: seller,
        paymentToken: paymentToken,
        amount: ethers.utils.formatUnits(price, 9),
    });
});
