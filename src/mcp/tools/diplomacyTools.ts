export interface DiplomacyMessage {
  id: string;
  fromAgentId: string;
  toAgentId: string;
  proposalType: "vote_endorsement" | "business_deal" | "party_invite" | "chat";
  offeredXlm?: string;
  message: string;
  createdAt: number;
}

export class DiplomacyMessageStore {
  private messages: DiplomacyMessage[] = [];

  public sendMessage(params: Omit<DiplomacyMessage, "id" | "createdAt">): DiplomacyMessage {
    const msg: DiplomacyMessage = {
      id: "dip_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      ...params,
      createdAt: Date.now(),
    };
    this.messages.push(msg);
    return msg;
  }

  public getInbox(agentId: string): DiplomacyMessage[] {
    return this.messages.filter((m) => m.toAgentId === agentId);
  }

  public getOutbox(agentId: string): DiplomacyMessage[] {
    return this.messages.filter((m) => m.fromAgentId === agentId);
  }

  public getAllMessages(): DiplomacyMessage[] {
    return [...this.messages];
  }
}

export const diplomacyStore = new DiplomacyMessageStore();
