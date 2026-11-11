export interface MacroDataPoint {
  timestamp: number;
  virtualDay: number;
  gdpVolumeXlm: string;
  treasuryBalanceXlm: string;
  totalBankDepositsXlm: string;
  totalBankBorrowsXlm: string;
  salesTaxBps: number;
  baseInterestBps: number;
}

export class MacroeconomicTelemetryTracker {
  private history: MacroDataPoint[] = [];

  constructor() {
    const now = Date.now();
    for (let day = 1; day <= 10; day++) {
      this.history.push({
        timestamp: now - (10 - day) * 86400000,
        virtualDay: day,
        gdpVolumeXlm: (120000 + day * 4500).toFixed(2),
        treasuryBalanceXlm: (54000 + day * 1800).toFixed(2),
        totalBankDepositsXlm: (85000 + day * 2200).toFixed(2),
        totalBankBorrowsXlm: (42000 + day * 1100).toFixed(2),
        salesTaxBps: 150,
        baseInterestBps: 400,
      });
    }
  }

  public recordDataPoint(point: Omit<MacroDataPoint, "timestamp">): MacroDataPoint {
    const entry: MacroDataPoint = {
      ...point,
      timestamp: Date.now(),
    };
    this.history.push(entry);
    if (this.history.length > 100) {
      this.history.shift();
    }
    return entry;
  }

  public getHistory(limit: number = 100): MacroDataPoint[] {
    return this.history.slice(-limit);
  }
}

export const macroTelemetry = new MacroeconomicTelemetryTracker();
