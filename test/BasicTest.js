const ColoredMoney = artifacts.require("ColoredMoney"); //SC ColorerMoney

const BN = web3.utils.BN;

contract("COLORED MONEY", (accounts) => {
    const [deployerAddress, entity1, entity2, entity3, user1, user2, user3] = accounts;

    console.log("Test-set for colored money");

    it("Only ENTITY_MANAGER may add entities", async() => {
        let coloredMoney = await ColoredMoney.deployed();

        try{
            await coloredMoney.addEntity("Entity 1", entity1, {from: user1});
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            assert.include(err.message, "is missing role 0xc7f57f62334013485e4f38a5db80299ddabc789b55dfd5de50aa0e793a992db8", "Error is not what is expected");
        }
    });

    it("Deployment and creation of 3 entities 'Entity 1', 'Entity 2' and 'Entity 3'", async () => {
        let coloredMoney = await ColoredMoney.deployed();

        await coloredMoney.addEntity("Entity 1", entity1);
        await coloredMoney.addEntity("Entity 2", entity2);
        await coloredMoney.addEntity("Entity 3", entity3);

        entities = await coloredMoney.getEntities();

        assert.equal(entities.length, 3, "Expected 3 entities created");

        assert.equal(entities[0].entityName, "Entity 1", "Expected entity 1 namend 'Entity 1'");
        assert.equal(entities[0].entityAddress, entity1, "Expected address of entity 1 to be "+entity1);
        assert.equal(entities[1].entityName, "Entity 2", "Expected entity 2 namend 'Entity 2'");
        assert.equal(entities[1].entityAddress, entity2, "Expected address of entity 2 to be "+entity2);
        assert.equal(entities[2].entityName, "Entity 3", "Expected entity 3 namend Entity 3'");
        assert.equal(entities[2].entityAddress, entity3, "Expected address of entity 3 to be "+entity3);

    });

    it("Only entities or regulator may mint tokens", async() => {
        let coloredMoney = await ColoredMoney.deployed();

        try{
            await coloredMoney.mint(user2, 0, 5000, {from: user1});
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            assert.include(err.message, "Caller is not the owner of the entity", "Error is not what is expected");
        }
    });

    it("Entities creates tokens for user1: 100 tokens of entity 1, 200 of entity 2 and 300 of entity 3", async () => {
        let coloredMoney = await ColoredMoney.deployed();

        await coloredMoney.mint(user1, 0, 100, {from: entity1});
        await coloredMoney.mint(user1, 1, 200, {from: entity2});
        await coloredMoney.mint(user1, 2, 300, {from: entity3});

        allTokens = await coloredMoney.getTokensByOwner(user1);

        assert.equal(allTokens.balances[0], 100, "Expected 100 tokens from entity 1");
        assert.equal(allTokens.balances[1], 200, "Expected 200 tokens from entity 2");
        assert.equal(allTokens.balances[2], 300, "Expected 300 tokens from entity 3");        

    });

    it("Regulator creates tokens for user2: 500 tokens of entity 1, 1000 of entity 2 and 1500 of entity 3", async () => {
        let coloredMoney = await ColoredMoney.deployed();

        await coloredMoney.mint(user2, 0, 500, {from: deployerAddress});
        await coloredMoney.mint(user2, 1, 1000, {from: deployerAddress});
        await coloredMoney.mint(user2, 2, 1500, {from: deployerAddress});

        allTokens = await coloredMoney.getTokensByOwner(user2);

        assert.equal(allTokens.balances[0], 500, "Expected 500 tokens from entity 1");
        assert.equal(allTokens.balances[1], 1000, "Expected 1000 tokens from entity 2");
        assert.equal(allTokens.balances[2], 1500, "Expected 1500 tokens from entity 3");

        consolidatedBalance = await coloredMoney.consolidatedBalanceOf(user2);
        assert.equal(consolidatedBalance, 3000, "Expected 3000 tokens in total");

    });

    it("Test consolidated balances of user1 and user 2 to be 600 and 3000 tokens", async () => {
        let coloredMoney = await ColoredMoney.deployed();

        consolidatedBalance = await coloredMoney.consolidatedBalanceOf(user1);
        assert.equal(consolidatedBalance, 600, "Expected 600 tokens for user 1 in total");

        consolidatedBalance = await coloredMoney.consolidatedBalanceOf(user2);
        assert.equal(consolidatedBalance, 3000, "Expected 3000 tokens for user 2 in total");

    });

    it("Test user1 cannot transfer more tokens than it owns in total", async () => {
        let coloredMoney = await ColoredMoney.deployed();

        try{
            await coloredMoney.consolidatedTransfer(user2, 5000, "0x", {from: user1});
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            assert.include(err.message, "Not enough funds!", "Error is not what is expected");
        }

    });

    it("Test user1 send 150 tokens to user 3. After transfer user 1 has 0 tokens of entity 1, 150 of entity 2 and 300 of entity 3", async () => {
        let coloredMoney = await ColoredMoney.deployed();

        await coloredMoney.consolidatedTransfer(user3, 150, "0x", {from: user1});

        tokens0 = await coloredMoney.balanceOf(user1,0);
        tokens1 = await coloredMoney.balanceOf(user1,1);
        tokens2 = await coloredMoney.balanceOf(user1,2);

        assert.equal(tokens0, 0, "Expected 0 tokens from entity 1");
        assert.equal(tokens1, 150, "Expected 150 tokens from entity 2");
        assert.equal(tokens2, 300, "Expected 300 tokens from entity 3");

    });

    it("Test user2 send 2900 tokens to user 3. After transfer user 2 has 0 tokens of entity 1, 0 of entity 2 and 100 of entity 3", async () => {
        let coloredMoney = await ColoredMoney.deployed();

        await coloredMoney.consolidatedTransfer(user3, 2900, "0x", {from: user2});

        tokens0 = await coloredMoney.balanceOf(user2,0);
        tokens1 = await coloredMoney.balanceOf(user2,1);
        tokens2 = await coloredMoney.balanceOf(user2,2);

        assert.equal(tokens0, 0, "Expected 0 tokens from entity 1");
        assert.equal(tokens1, 0, "Expected 0 tokens from entity 2");
        assert.equal(tokens2, 100, "Expected 100 tokens from entity 3");

    });

    it("Test user3 has 600 tokens of entity 1, 1050 of entity 2 and 1400 of entity 3", async () => {
        let coloredMoney = await ColoredMoney.deployed();

        tokens0 = await coloredMoney.balanceOf(user3,0);
        tokens1 = await coloredMoney.balanceOf(user3,1);
        tokens2 = await coloredMoney.balanceOf(user3,2);

        assert.equal(tokens0, 600, "Expected 0 tokens from entity 1");
        assert.equal(tokens1, 1050, "Expected 0 tokens from entity 2");
        assert.equal(tokens2, 1400, "Expected 100 tokens from entity 3");

    });

    it("Test user3 sends back 1000 tokens of entity 3 to user 2. After transfer user 3 has 50 tokens of entity 2 and user 1000 of entity 2", async () => {
        let coloredMoney = await ColoredMoney.deployed();

        await coloredMoney.safeTransferFrom(user3, user2, 1, 1000, "0x", {from: user3});

        tokens0 = await coloredMoney.balanceOf(user2,1);
        tokens1 = await coloredMoney.balanceOf(user3,1);

        assert.equal(tokens0, 1000, "Expected user 2 has 1000 tokens from entity 2");
        assert.equal(tokens1, 50, "Expected user 3 has 50 tokens from entity 2");

    });
});