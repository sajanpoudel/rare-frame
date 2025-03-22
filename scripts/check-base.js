const hre = require("hardhat");

async function main() {
  console.log("Checking Base network connection...");
  
  try {
    // Get the network
    const network = await hre.ethers.provider.getNetwork();
    console.log(`Connected to network: ${network.name} (chainId: ${network.chainId})`);
    
    // Get the latest block number
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Latest block number: ${blockNumber}`);
    
    // Get gas price
    const gasPrice = await hre.ethers.provider.getFeeData();
    console.log(`Current gas price: ${hre.ethers.formatUnits(gasPrice.gasPrice, "gwei")} gwei`);
    
    // Check wallet balance if private key is provided
    if (process.env.PRIVATE_KEY) {
      const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, hre.ethers.provider);
      const balance = await hre.ethers.provider.getBalance(wallet.address);
      console.log(`Wallet address: ${wallet.address}`);
      console.log(`Wallet balance: ${hre.ethers.formatEther(balance)} ETH`);
      
      if (balance.toString() === "0") {
        console.warn("Warning: Your wallet has 0 ETH. You'll need ETH to deploy contracts.");
        console.log("Get testnet ETH from:");
        console.log("- Base Sepolia: https://www.coinbase.com/faucets/base-sepolia-faucet");
        console.log("- Base Goerli: https://www.coinbase.com/faucets/base-goerli-faucet");
      }
    }
    
    console.log("Base network connection successful!");
  } catch (error) {
    console.error("Error connecting to Base network:", error);
    console.log("Please check your network configuration in hardhat.config.js");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 