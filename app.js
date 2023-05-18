require('dotenv').config();
const ethers = require("ethers");
const abi = require('./tangiblemarketplace.abi.json');
const sendmail = require('sendmail')();

const provider = new ethers.providers.WebSocketProvider(`wss://polygon-mainnet.g.alchemy.com/v2/pnpmjWAukN3uWbPxt-ukZMMiyIvAXLYL`);
const marketplace = new ethers.Contract("0x43e656716cF49C008435A8196d8f825f66f37254", abi, provider);

marketplace.on("MarketItemCreated", (tokenId, seller, paymentToken, price, event) => {
    console.log({
        event: 'MarketItemCreated',
        tokenId: tokenId,
        seller: seller,
        paymentToken: paymentToken,
        amount: ethers.utils.formatUnits(price, 9),
    });
    sendmail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'Tangible Marketplace MarketItemCreated',
        html: `
        <p><a href="https://www.tangible.store/pi-nfts/0x${Number(tokenId).toString(16)}" target="_blank">link</a></p>
        <p>tokenId: ${tokenId}</p>
        <p>price: ${ethers.utils.formatUnits(price, 9)}</p>`,
    });
});

marketplace.on("MarketItemUpdated", (tokenId, seller, paymentToken, price, event) => {
    console.log({
        event: 'MarketItemUpdated',
        tokenId: tokenId,
        seller: seller,
        paymentToken: paymentToken,
        amount: ethers.utils.formatUnits(price, 9),
    });
    sendmail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'Tangible Marketplace MarketItemUpdated',
        html: `
        <p><a href="https://www.tangible.store/pi-nfts/0x${Number(tokenId).toString(16)}" target="_blank">link</a></p>
        <p>tokenId: ${tokenId}</p>
        <p>price: ${ethers.utils.formatUnits(price, 9)}</p>`,
    });
});

marketplace.on("MarketItemSold", (tokenId, seller, buyer, paymentToken, price, feeAmount, event) => {
    console.log({
        event: 'MarketItemSold',
        tokenId: tokenId,
        seller: seller,
        buyer: buyer,
        paymentToken: paymentToken,
        amount: ethers.utils.formatUnits(price, 9),
        feeAmount: ethers.utils.formatUnits(feeAmount, 9),
    });
    sendmail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'Tangible Marketplace MarketItemSold',
        html: `
        <p><a href="https://www.tangible.store/pi-nfts/0x${Number(tokenId).toString(16)}" target="_blank">link</a></p>
        <p>tokenId: ${tokenId}</p>
        <p>price: ${ethers.utils.formatUnits(price, 9)}</p>`,
    });
});
