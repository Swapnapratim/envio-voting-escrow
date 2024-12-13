
const assert = require("assert");
const { TestHelpers } = require("generated");
const { MockDb, BeaconProxy } = TestHelpers;

describe("BeaconProxy contract AcceptEarlyUnlockOwnership event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for BeaconProxy contract AcceptEarlyUnlockOwnership event
  const event = BeaconProxy.AcceptEarlyUnlockOwnership.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("BeaconProxy_AcceptEarlyUnlockOwnership is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await BeaconProxy.AcceptEarlyUnlockOwnership.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualBeaconProxyAcceptEarlyUnlockOwnership = mockDbUpdated.entities.BeaconProxy_AcceptEarlyUnlockOwnership.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedBeaconProxyAcceptEarlyUnlockOwnership = {
      id:`${event.chainId}_${event.block.number}_${event.logIndex}`,
      admin: event.params.admin,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(
      actualBeaconProxyAcceptEarlyUnlockOwnership,
      expectedBeaconProxyAcceptEarlyUnlockOwnership,
      "Actual BeaconProxyAcceptEarlyUnlockOwnership should be the same as the expectedBeaconProxyAcceptEarlyUnlockOwnership"
    );
  });
});
