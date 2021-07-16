async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploing contract with account: ${deployer.address}`);
    const MyToken = await ethers.getContractFactory('MyToken');
    console.log('Deploying MyToken...');
    const mytoken = await MyToken.deploy();
    await mytoken.deployed();
    console.log(`MyToken deployed to: ${mytoken.address}`);
}

main()
    .then( ()=> process.exit(0) )
    .catch(error => {
        console.log(error);
        process.exit(1);
    });