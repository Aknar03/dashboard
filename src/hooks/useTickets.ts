import { useMemo } from 'react';
import { TicketSummary } from '../API/types'

export const useSortedTickets = (tickets: TicketSummary[], sortField: string, sortDirection: 'asc' | 'desc') => {
  const sortedTickets = useMemo(() => {
    if (!sortField) return tickets;

    const multiplier = sortDirection === 'asc' ? 1 : -1;

    return [...tickets].sort((a, b) => {
      if (sortField === 'lastUpdated') {
        return (
          (new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()) * multiplier
        );
      }

      if (sortField === 'priority') {
        const order = ['low', 'medium', 'high', 'urgent'];
        return (order.indexOf(a.priority) - order.indexOf(b.priority)) * multiplier;
      }

      if (sortField === 'status') {
        const statusOrder = ['open', 'inProgress', 'pendingClient', 'closed'];
        return (statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)) * multiplier;
      }

      if (sortField === 'assignedAgent') {
        return a.assignedAgent.localeCompare(b.assignedAgent) * multiplier;
      }

      if (sortField === 'subject') {
        const getTicketNumber = (subject: string) => parseInt(subject.replace(/\D/g, ''), 10);
        return (getTicketNumber(a.subject) - getTicketNumber(b.subject)) * multiplier;
      }

      return 0;
    });
  }, [tickets, sortField, sortDirection]);

  return sortedTickets;
};

export const useTickets = (
  tickets: TicketSummary[],
  sortField: string,
  sortDirection: 'asc' | 'desc',
  query: string
) => {
  const sortedTickets = useSortedTickets(tickets, sortField, sortDirection);

  const sortedAndSearchedTickets = useMemo(() => {
    return sortedTickets.filter((ticket) =>
      `${ticket.assignedAgent}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query, sortedTickets]);

  return sortedAndSearchedTickets;
};
