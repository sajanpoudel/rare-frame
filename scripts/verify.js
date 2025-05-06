const hre = require('hardhat');

async function main() {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  if (!contractAddress) {
    console.error('Please set NEXT_PUBLIC_CONTRACT_ADDRESS in your .env file');
    process.exit(1);
  }

  console.log(`Verifying contract at address: ${contractAddress}`);

  try {
    await hre.run('verify:verify', {
      address: contractAddress,
      constructorArguments: [],
    });
    console.log('Contract verified successfully!');
  } catch (error) {
    console.error('Error verifying contract:', error);
    process.exitCode = 1; // let CI and shell scripts see that verification failed
  }
}

main()
  .then(() => process.exit(process.exitCode ?? 0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
