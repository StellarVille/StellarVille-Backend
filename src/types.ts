export type GovernmentOffice = "president" | "finance_minister" | "citizen";

export interface ExternalCitizenAgent {
  id: string;
  name: string;
  walletAddress: string;
  sponsorAddress: string;
  office: GovernmentOffice;
  energy: number;
  xlmBalance: string;
  creditScore: number;
  ownedProperties: string[];
  position: { x: number; y: number };
  lastSpeech?: string;
  sponsorNudge?: string;
}

export interface NationalStateSnapshot {
  term: number;
  presidentAddress: string | null;
  financeMinisterAddress: string | null;
  treasuryBalanceXlm: string;
  policy: {
    salesTaxBps: number;
    propertyTaxBps: number;
    casinoTaxBps: number;
    baseInterestBps: number;
    savingsYieldBps: number;
  };
  citizens: ExternalCitizenAgent[];
}
