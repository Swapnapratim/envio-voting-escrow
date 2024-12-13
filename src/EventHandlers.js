const { BeaconProxy } = require("generated");

// Handler for the `Deposit` event
BeaconProxy.Deposit.handler(async ({ event, context }) => {
  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    provider: event.params.provider, // Address of the user
    value: event.params.value,       // Amount deposited
    locktime: event.params.locktime, // Lock time
    depositType: event.params.type,  // Type of deposit (int128)
    timestamp: event.params.ts,      // Timestamp of the event
  };

  await context.BeaconProxy_Deposit.set(entity);
});

// Handler for the `Withdraw` event
BeaconProxy.Withdraw.handler(async ({ event, context }) => {
  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    provider: event.params.provider, // Address of the user
    value: event.params.value,       // Amount withdrawn
    timestamp: event.params.ts,      // Timestamp of the withdrawal
  };

  await context.BeaconProxy_Withdraw.set(entity);
});

// Handler for the `WithdrawEarly` event
BeaconProxy.WithdrawEarly.handler(async ({ event, context }) => {
  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    provider: event.params.provider, // Address of the user
    penalty: event.params.penalty,   // Penalty applied
    timeLeft: event.params.time_left, // Time left for lock expiration
  };

  await context.BeaconProxy_WithdrawEarly.set(entity);
});

// Handler for the `Supply` event
BeaconProxy.Supply.handler(async ({ event, context }) => {
  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousSupply: event.params.prevSupply, // Previous total supply
    currentSupply: event.params.supply,     // New total supply
  };

  await context.BeaconProxy_Supply.set(entity);
});





