/**
 * StellarVille MCP Gateway Server (Scaffold)
 * Exposes tools for external BYOA (Bring Your Own Agent) clients to interact
 * with the country and sign Soroban transactions.
 */
export const STELLARVILLE_MCP_TOOLS = [
  "register_citizen",
  "get_citizen_status",
  "buy_property",
  "buy_item",
  "bank_action",
  "play_arena_wager",
  "bet_on_election",
  "declare_candidacy",
  "broadcast_speech",
  "cast_vote",
  "enact_economic_policy",
  "set_monetary_rates",
] as const;

export class StellarVilleMcpGateway {
  public start(port = 4000) {
    console.log(`🔌 [MCP Gateway] Listening for external AI agents on http://localhost:${port}/mcp`);
    console.log(`🛠️  [MCP Gateway] Registered ${STELLARVILLE_MCP_TOOLS.length} national tools.`);
  }
}
