import { useDispatch, useSelector } from 'react-redux';
import { setStatusFilter } from '../store/ticketFiltersSlice';
import { RootState } from '../store/store';

const StatusFilter = () => {
  const dispatch = useDispatch();
  const selectedStatus = useSelector((state: RootState) => state.ticketFilters.status);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'open' | 'inProgress' | 'pendingClient' | 'closed';
    const newStatus = selectedStatus.includes(value)
      ? selectedStatus.filter((status) => status !== value)
      : [...selectedStatus, value];
    dispatch(setStatusFilter(newStatus));
  };

  return (
    <div>
      <h3>Фильтр по статусу</h3>
      <label>
        <input
          type="checkbox"
          value="open"
          checked={selectedStatus.includes('open')}
          onChange={handleStatusChange}
        />
        Открыто
      </label>
      <label>
        <input
          type="checkbox"
          value="inProgress"
          checked={selectedStatus.includes('inProgress')}
          onChange={handleStatusChange}
        />
        В обработке
      </label>
      <label>
        <input
          type="checkbox"
          value="pendingClient"
          checked={selectedStatus.includes('pendingClient')}
          onChange={handleStatusChange}
        />
        Ожидает ответ клиента
      </label>
      <label>
        <input
          type="checkbox"
          value="closed"
          checked={selectedStatus.includes('closed')}
          onChange={handleStatusChange}
        />
        Закрыто
      </label>
    </div>
  );
};

export default StatusFilter;
