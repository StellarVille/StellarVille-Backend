export interface FaucetFundingResult {
  walletAddress: string;
  fundedXlm: string;
  friendbotTxHash: string;
  timestamp: number;
}

export class TestnetFaucetService {
  private fundedCache: Set<string> = new Set();

  public isAlreadyFunded(walletAddress: string): boolean {
    return this.fundedCache.has(walletAddress);
  }

  public async fundTestnetWallet(walletAddress: string): Promise<FaucetFundingResult> {
    if (!walletAddress || !walletAddress.startsWith("G")) {
      throw new Error(`Invalid Stellar wallet address format: ${walletAddress}`);
    }

    if (this.fundedCache.has(walletAddress)) {
      throw new Error(`Wallet ${walletAddress} has already received testnet faucet funding`);
    }

    const friendbotTxHash = "fb_" + Math.random().toString(36).substring(2, 12);
    const result: FaucetFundingResult = {
      walletAddress,
      fundedXlm: "10000.0000000",
      friendbotTxHash,
      timestamp: Date.now(),
    };

    this.fundedCache.add(walletAddress);
    return result;
  }
}

export const faucetService = new TestnetFaucetService();
