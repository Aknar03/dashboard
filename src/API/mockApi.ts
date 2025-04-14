// Типы
export type TicketStatus = 'open' | 'inProgress' | 'pendingClient' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TicketStats {
  open: number;
  inProgress: number;
  pendingClient: number;
  closedToday: number;
}

export interface TicketSummary {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  lastUpdated: string; // ISO-строка
  assignedAgent?: string;
}

// Мок-статистика
const mockStatsData: TicketStats = {
  open: 5,
  inProgress: 3,
  pendingClient: 2,
  closedToday: 7,
};

// Мок-тикеты
const mockTickets: TicketSummary[] = [
  {
    id: '1',
    subject: 'Проблема с авторизацией',
    status: 'open',
    priority: 'high',
    lastUpdated: '2025-04-14T09:30:00Z',
    assignedAgent: 'Agent A',
  },
  {
    id: '2',
    subject: 'Сбой в системе оплаты',
    status: 'inProgress',
    priority: 'urgent',
    lastUpdated: '2025-04-13T14:20:00Z',
    assignedAgent: 'Agent B',
  },
  {
    id: '3',
    subject: 'Клиент не отвечает',
    status: 'pendingClient',
    priority: 'medium',
    lastUpdated: '2025-04-12T16:00:00Z',
  },
  {
    id: '4',
    subject: 'Запрос на возврат',
    status: 'closed',
    priority: 'low',
    lastUpdated: '2025-04-14T08:00:00Z',
    assignedAgent: 'Agent C',
  },
  {
    id: '5',
    subject: 'Ошибка в мобильном приложении',
    status: 'open',
    priority: 'high',
    lastUpdated: '2025-04-13T11:15:00Z',
  },
];

// Утилита имитации задержки и ошибок
const simulateDelay = <T>(data: T, shouldFail = false, delay = 1000): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Ошибка при получении данных'));
      } else {
        resolve(structuredClone(data)); // Глубокая копия
      }
    }, delay);
  });
};

// Функции API
export const fetchTicketStats = (shouldFail = false): Promise<TicketStats> => {
  return simulateDelay(mockStatsData, shouldFail);
};

export const fetchTickets = (shouldFail = false): Promise<TicketSummary[]> => {
  return simulateDelay(mockTickets, shouldFail);
};
