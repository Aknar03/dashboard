import { useQuery } from '@tanstack/react-query';
import { fetchTickets } from '../../API/mockApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setSort } from '../../store/ticketFiltersSlice';
import { useMemo } from 'react';
import StatusFilter from '../../components/StatusFilter';
import PriorityFilter from '../../components/PriorityFilter';

const TicketsPage = () => {
  const { data: tickets, isLoading, isError } = useQuery({
    queryKey: ['tickets'],
    queryFn: fetchTickets,
  });

  const filters = useSelector((state: RootState) => state.ticketFilters);
  const dispatch = useDispatch();

  const filteredTickets = useMemo(() => {
    if (!tickets) return [];
    return [...tickets]
      .filter((ticket) =>
        filters.status.length > 0 ? filters.status.includes(ticket.status) : true
      )
      .filter((ticket) =>
        filters.priority.length > 0 ? filters.priority.includes(ticket.priority) : true
      )
      .sort((a, b) => {
        const { field, direction } = filters.sort;
        const multiplier = direction === 'asc' ? 1 : -1;

        if (field === 'lastUpdated') {
          return (
            (new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()) *
            multiplier
          );
        }

        if (field === 'priority') {
          const order = ['low', 'medium', 'high', 'urgent'];
          return (
            (order.indexOf(a.priority) - order.indexOf(b.priority)) * multiplier
          );
        }

        return 0;
      });
  }, [tickets, filters]);

  if (isLoading) return <p>Загрузка тикетов...</p>;
  if (isError || !tickets) return <p>Ошибка загрузки</p>;

  return (
    <div>
      <h2>Список тикетов</h2>
      
      {/* Добавляем фильтры */}
      <StatusFilter />
      <PriorityFilter />
      
      <button
        onClick={() =>
          dispatch(
            setSort({
              field: 'priority',
              direction: filters.sort.direction === 'asc' ? 'desc' : 'asc',
            })
          )
        }
      >
        Сортировать по приоритету ({filters.sort.direction})
      </button>

      <ul>
        {filteredTickets.map((t) => (
          <li key={t.id}>
            #{t.id} – {t.subject} – <strong>{t.priority}</strong> – {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketsPage;
