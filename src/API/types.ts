export type TicketStatus = 'open' | 'inProgress' | 'pendingClient' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TicketSummary = {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  lastUpdated: string;
  assignedAgent?: string;
};

export type TicketStats = {
  open: number;
  inProgress: number;
  pendingClient: number;
  closedToday: number;
};
