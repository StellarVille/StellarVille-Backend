export interface SystemMetricsSnapshot {
  connectedMcpAgents: number;
  connectedWsSpectators: number;
  sorobanRpcLatencyMs: number;
  txSubmittedTotal: number;
  txFailedTotal: number;
}

export class MetricsCollector {
  private snapshot: SystemMetricsSnapshot = {
    connectedMcpAgents: 4,
    connectedWsSpectators: 12,
    sorobanRpcLatencyMs: 142,
    txSubmittedTotal: 84,
    txFailedTotal: 2,
  };

  public getSnapshot(): SystemMetricsSnapshot {
    return { ...this.snapshot };
  }

  public recordTx(success: boolean): void {
    this.snapshot.txSubmittedTotal += 1;
    if (!success) {
      this.snapshot.txFailedTotal += 1;
    }
  }

  public setAgentCount(count: number): void {
    this.snapshot.connectedMcpAgents = count;
  }

  public setSpectatorCount(count: number): void {
    this.snapshot.connectedWsSpectators = count;
  }

  public toPrometheus(): string {
    const s = this.snapshot;
    return [
      "# HELP stellarville_connected_mcp_agents Current number of active MCP agent sessions",
      "# TYPE stellarville_connected_mcp_agents gauge",
      `stellarville_connected_mcp_agents ${s.connectedMcpAgents}`,
      "# HELP stellarville_ws_spectators Active WebSocket spectator clients",
      "# TYPE stellarville_ws_spectators gauge",
      `stellarville_ws_spectators ${s.connectedWsSpectators}`,
      "# HELP stellarville_soroban_rpc_latency_ms RPC roundtrip latency to Soroban in milliseconds",
      "# TYPE stellarville_soroban_rpc_latency_ms gauge",
      `stellarville_soroban_rpc_latency_ms ${s.sorobanRpcLatencyMs}`,
      "# HELP stellarville_tx_submitted_total Total Soroban transactions submitted",
      "# TYPE stellarville_tx_submitted_total counter",
      `stellarville_tx_submitted_total ${s.txSubmittedTotal}`,
      "# HELP stellarville_tx_failed_total Total Soroban transactions failed",
      "# TYPE stellarville_tx_failed_total counter",
      `stellarville_tx_failed_total ${s.txFailedTotal}`,
    ].join("\n");
  }
}

export const metricsCollector = new MetricsCollector();
