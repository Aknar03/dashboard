import { TicketPriority, TicketStats, TicketStatus, TicketSummary } from './types';

// Мок-данные для статистики тикетов
export const mockStatsData: TicketStats = {
  open: 5,
  inProgress: 12,
  pendingClient: 3,
  closedToday: 2,
};

const randomDateInPastWeek = () => {
  const now = new Date();
  now.setDate(now.getDate() - Math.floor(Math.random() * 7));
  now.setHours(Math.floor(Math.random() * 24));
  now.setMinutes(Math.floor(Math.random() * 60));
  return now.toISOString();
};


// Функция для имитации асинхронного запроса статистики тикетов
export const fetchTicketStats = async (): Promise<TicketStats> => {
  return new Promise((resolve) =>
    resolve(mockStatsData)
  );
};

export const fetchTickets = async (): Promise<TicketSummary[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  const users = await response.json();
  const usernames = users.map((u: any) => u.username);

  const statuses: TicketStatus[] = ['open', 'inProgress', 'pendingClient', 'closed'];
  const priorities: TicketPriority[] = ['low', 'medium', 'high', 'urgent'];

  const tickets: TicketSummary[] = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    subject: `Ticket #${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    lastUpdated: randomDateInPastWeek(),
    assignedAgent: usernames[Math.floor(Math.random() * usernames.length)],
  }));

  return new Promise((resolve) => setTimeout(() => resolve(tickets), 1000));
};


export const fetchUsers = async (): Promise<string[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  const users = await response.json();
  return users.map((user: any) => user.username);
};