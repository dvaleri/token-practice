const {expect} = require("chai");

describe("MyToken contract", function () {
    let MyToken;
    let mytoken;
    let owner;

    beforeEach(async function() {
        MyToken = await ethers.getContractFactory("MyToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        mytoken = await MyToken.deploy();
    });

    describe("Deployment", function() {
        it("Should assign all tokens to the deployer", async function (){
            const ownerBalances = await mytoken.balanceOfBatch([owner.address, owner.address, owner.address], [0,1,2]);
            expect(ownerBalances.toString()).to.equal("1000,500,1");
        });
    });

    describe("Transfer", function(){
        it("Should transfer the selected token between accounts", async function (){
            await mytoken.safeTransferFrom(owner.address, addr1.address, 0, 200, 0x0);
            const balances = await mytoken.balanceOfBatch([owner.address, addr1.address], [0,0]);
            expect(balances[0].toNumber()).to.equal(800);
            expect(balances[1].toNumber()).to.equal(200);
        });
    });
});