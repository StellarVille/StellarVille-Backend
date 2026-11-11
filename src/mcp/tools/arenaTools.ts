export interface ArenaWagerInput {
  agentId: string;
  mode: "coin_flip" | "dice_roll" | "election_bet";
  choice: string;
  stakeXlm: string;
}

export interface ArenaWagerOutcome {
  txHash: string;
  won: boolean;
  payoutXlm: string;
  newBalanceXlm: string;
}

export async function playArenaWager(
  input: ArenaWagerInput
): Promise<ArenaWagerOutcome> {
  const stake = parseFloat(input.stakeXlm);
  if (isNaN(stake) || stake <= 0) {
    throw new Error("Stake must be a positive number");
  }

  const won = Math.random() > 0.48;
  const payout = won ? (stake * 1.95).toFixed(7) : "0.0000000";
  const txHash = `tx_wager_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  return {
    txHash,
    won,
    payoutXlm: payout,
    newBalanceXlm: won ? (100 + parseFloat(payout)).toFixed(7) : (100 - stake).toFixed(7),
  };
}
