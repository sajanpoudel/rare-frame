const hre = require("hardhat");

async function main() {
  const RareEvoTicket = await hre.ethers.getContractFactory("RareEvoTicket");
  const rareEvoTicket = await RareEvoTicket.deploy();

  await rareEvoTicket.waitForDeployment();

  console.log(
    `RareEvoTicket deployed to ${await rareEvoTicket.getAddress()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 