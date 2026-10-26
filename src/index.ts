import { StellarVilleMcpGateway } from "./mcp/server.js";
import { NationWorldEngine } from "./world/engine.js";

const mcpGateway = new StellarVilleMcpGateway();
const worldEngine = new NationWorldEngine();

mcpGateway.start(4000);
worldEngine.start();
