import { useQuery } from '@tanstack/react-query';
import { fetchTickets } from '../../API/mockApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setSort } from '../../store/ticketFiltersSlice';
import { useState } from 'react';
import * as styles from './TicketList.module.scss';
import Input from '../../components/UI/input/Input';
import { useTickets } from '../../hooks/useTickets';
import { CircularProgress } from '@mui/material';

const TicketList = () => {
  const { data: tickets, isLoading, isError } = useQuery({
    queryKey: ['tickets'],
    queryFn: fetchTickets,
  });
  const columns: { label: string; field: 'priority' | 'lastUpdated' | 'status' | 'assignedAgent' | 'subject' }[] = [
    { label: 'Subject', field: 'subject' },
    { label: 'Status', field: 'status' },
    { label: 'Priority', field: 'priority' },
    { label: 'Assigned to', field: 'assignedAgent' },
    { label: 'Last Updated', field: 'lastUpdated' },
  ];
  const filters = useSelector((state: RootState) => state.ticketFilters);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = useTickets(
    tickets || [],
    filters.sort.field,
    filters.sort.direction,
    searchQuery
  );

  if (isLoading) return (
    <div className={styles.loader}>
      <CircularProgress size='80px'/>
    </div>
    
  );
  if (isError || !tickets) return <p>Ошибка загрузки</p>;

  return (
    <>
    
      <Input
        placeholder="Поиск..."
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        style={{ left: 20, position: 'relative' }}
      />
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map(({ label, field }) => (
                <th
                  key={field}
                  onClick={() =>
                    dispatch(
                      setSort({
                        field,
                        direction:
                          filters.sort.field === field && filters.sort.direction === 'asc'
                            ? 'desc'
                            : 'asc',
                      })
                    )
                  }
                >
                  {label} ⬍
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredTickets.map((t) => (
              <tr key={t.id}>
                <td>{t.subject}</td>
                <td>
                  <span className={`${styles.badge} ${styles[`status_${t.status}`]}`}>
                    {t.status}
                  </span>
                </td>
                <td>
                  <span className={`${styles.badge} ${styles[`priority_${t.priority}`]}`}>
                    {t.priority}
                  </span>
                </td>
                <td>{t.assignedAgent}</td>
                <td>{new Date(t.lastUpdated).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TicketList;
