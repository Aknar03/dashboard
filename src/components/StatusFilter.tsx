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

    </div>
  );
};

export default StatusFilter;
