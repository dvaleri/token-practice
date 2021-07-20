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

    describe("New Token", function(){
        it("Should create a new token with supply of 1 and assign it to the contract owner", async function (){
            await mytoken.createToken(1);
            const newBalance = await mytoken.balanceOf(owner.address, 3);
            expect(newBalance.toNumber()).to.equal(1);
        });
    });

    describe("Get URI", function(){
        it("Should return the uri for given token type", async function(){
            let id = 0;
            let uri = await mytoken.uri(id);
            id = ethers.utils.defaultAbiCoder.encode(['uint256'],[id]).substring(2);
            uri = uri.replace("{id}", id);
            //console.log(uri);
            expect(uri).to.equal("http://127.0.0.1:8000/0000000000000000000000000000000000000000000000000000000000000000.json");           
        });
    });
});