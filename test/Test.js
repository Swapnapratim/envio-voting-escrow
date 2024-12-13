const assert = require("assert");
const { TestHelpers } = require("generated");
const { MockDb, BeaconProxy } = TestHelpers;

describe("BeaconProxy Event Handlers", () => {
  it("Processes a Deposit event correctly", async () => {
    const mockDbInitial = MockDb.createMockDb();

    // Manually construct a mock event
    const mockDepositEvent = {
      params: {
        provider: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        _1: BigInt("1000000000000000000000"), // value
        locktime: BigInt("1766016000"), // locktime
        _3: BigInt(1), // depositType
        _4: BigInt("1734097068"), // timestamp
      },
      chainId: 11155111,
      block: {
        number: 123456,
        timestamp: 1734097068, // Correct type
      },
      transaction: {
        hash: "0xmocktransactionhash",
      },
      logIndex: 0,
    };

    // Pass the mock event directly to the handler
    const updatedMockDb = await BeaconProxy.Deposit.processEvent({
      event: mockDepositEvent,
      mockDb: mockDbInitial,
    });

    const expectedDepositEntity = {
      id: "11155111_123456_0",
      provider: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      value: "1000000000000000000000",
      locktime: "1766016000",
      depositType: 1,
      timestamp: "1734097068",
    };

    const actualDepositEntity = updatedMockDb.entities.BeaconProxy_Deposit.get(
      expectedDepositEntity.id
    );

    assert.deepStrictEqual(actualDepositEntity, expectedDepositEntity);
  });

  it("Processes a Withdraw event correctly", async () => {
    const mockDbInitial = MockDb.createMockDb();

    // Manually construct a mock event
    const mockWithdrawEvent = {
      params: {
        provider: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        _1: BigInt("500000000000000000000"), // value
        _2: BigInt("1734098068"), // timestamp
      },
      chainId: 11155111,
      block: {
        number: 123457,
        timestamp: 1734098068,
      },
      transaction: {
        hash: "0xmocktransactionhash2",
      },
      logIndex: 0,
    };

    // Pass the mock event directly to the handler
    const updatedMockDb = await BeaconProxy.Withdraw.processEvent({
      event: mockWithdrawEvent,
      mockDb: mockDbInitial,
    });

    const expectedWithdrawEntity = {
      id: "11155111_123457_0",
      provider: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      value: "500000000000000000000",
      timestamp: "1734098068",
    };

    const actualWithdrawEntity = updatedMockDb.entities.BeaconProxy_Withdraw.get(
      expectedWithdrawEntity.id
    );

    assert.deepStrictEqual(actualWithdrawEntity, expectedWithdrawEntity);
  });
});
