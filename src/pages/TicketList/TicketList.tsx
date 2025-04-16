// TicketList.tsx

import { useQuery } from '@tanstack/react-query';
import { fetchTickets } from '../../API/mockApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setSort } from '../../store/ticketFiltersSlice';
import { lazy, Suspense, useMemo, useState } from 'react';
import StatusFilter from '../../components/StatusFilter';
import PriorityFilter from '../../components/PriorityFilter';
import * as styles from './TicketList.module.scss';

const AdvancedTicketFilters = lazy(() => import('../../components/AdvancedTicketFilters'));

const TicketList = () => {
  const { data: tickets, isLoading, isError } = useQuery({
    queryKey: ['tickets'],
    queryFn: fetchTickets,
  });

  const filters = useSelector((state: RootState) => state.ticketFilters);
  const dispatch = useDispatch();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  const handleApplyDateFilters = (startDate: string, endDate: string) => {
    setStartDateFilter(startDate);
    setEndDateFilter(endDate);
  };

  const filteredTickets = useMemo(() => {
    if (!tickets) return [];

    return [...tickets]
      .filter((ticket) =>
        filters.status.length > 0 ? filters.status.includes(ticket.status) : true
      )
      .filter((ticket) =>
        filters.priority.length > 0 ? filters.priority.includes(ticket.priority) : true
      )
      .filter((ticket) => {
        const ticketDate = new Date(ticket.lastUpdated).toISOString().split('T')[0];
        if (startDateFilter && ticketDate < startDateFilter) return false;
        if (endDateFilter && ticketDate > endDateFilter) return false;
        return true;
      })
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
  }, [tickets, filters, startDateFilter, endDateFilter]);

  if (isLoading) return <p>Загрузка тикетов...</p>;
  if (isError || !tickets) return <p>Ошибка загрузки</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Список тикетов</h2>
  
      <div className={styles.filters}>
        <StatusFilter />
        <PriorityFilter />
  
        <button
          className={styles.button}
          onClick={() =>
            dispatch(
              setSort({
                field: 'priority',
                direction: filters.sort.direction === 'asc' ? 'desc' : 'asc',
              })
            )
          }
        >
          Сортировать по приоритету ({filters.sort.direction === 'asc' ? 'по возрастанию' : 'по убыванию'})
        </button>
  
        <button
          className={styles.button}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          {showAdvancedFilters ? 'Скрыть расширенные фильтры' : 'Показать расширенные фильтры'}
        </button>
      </div>
  
      {showAdvancedFilters && (
        <Suspense fallback={<p>Загрузка расширенных фильтров...</p>}>
          <AdvancedTicketFilters onApplyFilters={handleApplyDateFilters} />
        </Suspense>
      )}
  
      <ul className={styles.list}>
        {filteredTickets.map((t) => (
          <li key={t.id} className={styles.item}>
            #{t.id} – {t.subject} – <strong>{t.priority}</strong> – {t.status} –{' '}
            {new Date(t.lastUpdated).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default TicketList;
