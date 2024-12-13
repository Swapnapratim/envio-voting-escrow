const { BeaconProxy } = require("generated");

// Handler for the `Deposit` event
BeaconProxy.Deposit.handler(async ({ event, context }) => {
  console.log("Received mock event:", event.params);
  console.log("-----------------------");

  const provider = event.params.provider; // Indexed: provider
  const value = event.params._1.toString(); // Non-indexed: value
  const locktime = event.params.locktime.toString(); // Indexed: locktime
  const depositType = Number(event.params._3); // Non-indexed: type
  const timestamp = event.params._4.toString(); // Non-indexed: ts

  console.log({ provider, value, locktime, depositType, timestamp });

  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    provider,
    value,
    locktime,
    depositType,
    timestamp,
  };

  await context.BeaconProxy_Deposit.set(entity);
  console.log("Deposit entity saved:", entity);
});

// Handler for the `Withdraw` event
BeaconProxy.Withdraw.handler(async ({ event, context }) => {
  console.log("Withdraw event received:", event.params);

  const provider = event.params.provider; // Indexed: provider
  const value = event.params._1.toString(); // Non-indexed: value
  const timestamp = event.params._2.toString(); // Non-indexed: ts

  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    provider,
    value,
    timestamp,
  };

  await context.BeaconProxy_Withdraw.set(entity);
  console.log("Withdraw entity saved:", entity);
});

// Handler for the `WithdrawEarly` event
BeaconProxy.WithdrawEarly.handler(async ({ event, context }) => {
  console.log("WithdrawEarly event received:", event.params);

  const provider = event.params.provider; // Indexed: provider
  const penalty = event.params._1.toString(); // Non-indexed: penalty
  const timeLeft = event.params._2.toString(); // Non-indexed: time left

  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    provider,
    penalty,
    timeLeft,
  };

  await context.BeaconProxy_WithdrawEarly.set(entity);
  console.log("WithdrawEarly entity saved:", entity);
});

// Handler for the `Supply` event
BeaconProxy.Supply.handler(async ({ event, context }) => {
  console.log("Supply event received:", event.params);

  const previousSupply = event.params._0.toString(); // Non-indexed: prevSupply
  const currentSupply = event.params._1.toString(); // Non-indexed: supply

  const entity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousSupply,
    currentSupply,
  };

  await context.BeaconProxy_Supply.set(entity);
  console.log("Supply entity saved:", entity);
});
