// TicketList.tsx

import { useQuery } from '@tanstack/react-query';
import { fetchTickets } from '../../API/mockApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setSort } from '../../store/ticketFiltersSlice';
import { lazy, Suspense, useMemo, useState } from 'react';
import * as styles from './TicketList.module.scss';

const AdvancedTicketFilters = lazy(() => import('../../components/AdvancedTicketFilters'));

const TicketList = () => {
  const { data: tickets, isLoading, isError } = useQuery({
    queryKey: ['tickets'],
    queryFn: fetchTickets,
  });

  const filters = useSelector((state: RootState) => state.ticketFilters);
  const dispatch = useDispatch();
 
  const filteredTickets = useMemo(() => {
    if (!tickets) return [];
  
    return [...tickets]

      .sort((a, b) => {
        const { field, direction } = filters.sort;
        const multiplier = direction === 'asc' ? 1 : -1;
  
        if (field === 'lastUpdated') {
          return (
            (new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()) * multiplier
          );
        }
  
        if (field === 'priority') {
          const order = ['low', 'medium', 'high', 'urgent'];
          return (order.indexOf(a.priority) - order.indexOf(b.priority)) * multiplier;
        }
  
        if (field === 'status') {
          const statusOrder = ['open', 'inProgress', 'pendingClient', 'closed'];
          return (statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)) * multiplier;
        }
  
        return 0;
      });
  }, [tickets, filters]);
  

  if (isLoading) return <p>Загрузка тикетов...</p>;
  if (isError || !tickets) return <p>Ошибка загрузки</p>;

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
      <thead>
  <tr>
    <th>Subject</th>
    <th
      onClick={() =>
        dispatch(
          setSort({
            field: 'status',
            direction:
              filters.sort.field === 'status' && filters.sort.direction === 'asc'
                ? 'desc'
                : 'asc',
          })
        )
      }
    >
      Status ⬍
    </th>
    <th
      onClick={() =>
        dispatch(
          setSort({
            field: 'priority',
            direction:
              filters.sort.field === 'priority' && filters.sort.direction === 'asc'
                ? 'desc'
                : 'asc',
          })
        )
      }
    >
      Priority ⬍
    </th>
    <th>Assigned to</th>
    <th
      onClick={() =>
        dispatch(
          setSort({
            field: 'lastUpdated',
            direction:
              filters.sort.field === 'lastUpdated' && filters.sort.direction === 'asc'
                ? 'desc'
                : 'asc',
          })
        )
      }
    >
      Last Updated ⬍
    </th>
  </tr>
</thead>

        <tbody>
          {filteredTickets.map((t) => (
            <tr key={t.id}>
              <td>{t.subject}</td>
              <td><span className={`${styles.badge} ${styles[`status_${t.status}`]}`}>{t.status}</span></td>
              <td><span className={`${styles.badge} ${styles[`priority_${t.priority}`]}`}>{t.priority}</span></td>
              <td>{t.assignedAgent}</td>
              <td>{new Date(t.lastUpdated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default TicketList;
