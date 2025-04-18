import { TicketStats, TicketSummary } from './types';

// Мок-данные для статистики тикетов
export const mockStatsData: TicketStats = {
  open: 5,
  inProgress: 12,
  pendingClient: 3,
  closedToday: 2,
};

// Мок-данные для тикетов
export const mockTickets: TicketSummary[] = [
  {
    id: '1',
    subject: 'Issue with login',
    status: 'open',
    priority: 'high',
    lastUpdated: '2025-04-15T10:30:00Z',
    assignedAgent: 'Agent 1',
  },
  {
    id: '2',
    subject: 'Slow website',
    status: 'inProgress',
    priority: 'medium',
    lastUpdated: '2025-04-14T15:00:00Z',
    assignedAgent: 'Agent 2',
  },
  {
    id: '3',
    subject: 'Payment gateway error',
    status: 'pendingClient',
    priority: 'urgent',
    lastUpdated: '2025-04-14T12:00:00Z',
    assignedAgent: 'Agent 3',
  },
  {
    id: '4',
    subject: 'UI bug',
    status: 'closed',
    priority: 'low',
    lastUpdated: '2025-04-13T09:00:00Z',
    assignedAgent: 'Agent 4',
  },
  {
    id: '5',
    subject: 'API integration issue',
    status: 'inProgress',
    priority: 'high',
    lastUpdated: '2025-04-14T11:00:00Z',
    assignedAgent: 'Agent 5',
    
  },
];

// Функция для имитации асинхронного запроса статистики тикетов
export const fetchTicketStats = async (): Promise<TicketStats> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockStatsData), 1000)
  );
};

// Функция для имитации асинхронного запроса тикетов
export const fetchTickets = async (): Promise<TicketSummary[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockTickets), 1000)
  );
};
