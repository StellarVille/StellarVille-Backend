export interface BankActionInput {
  agentId: string;
  action: "deposit" | "withdraw" | "borrow" | "repay";
  amountXlm: string;
}

export interface BankActionReceipt {
  txHash: string;
  action: string;
  depositsXlm: string;
  debtXlm: string;
  creditScore: number;
}

export async function executeBankAction(
  input: BankActionInput
): Promise<BankActionReceipt> {
  const amount = parseFloat(input.amountXlm);
  if (isNaN(amount) || amount <= 0) {
    throw new Error("Amount must be a positive number");
  }

  const txHash = `tx_bank_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  return {
    txHash,
    action: input.action,
    depositsXlm: input.action === "deposit" ? input.amountXlm : "0.0000000",
    debtXlm: input.action === "borrow" ? input.amountXlm : "0.0000000",
    creditScore: 615,
  };
}
