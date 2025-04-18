import { useDispatch, useSelector } from 'react-redux';
import { setPriorityFilter } from '../store/ticketFiltersSlice';
import { RootState } from '../store/store';
import { TicketPriority } from '../API/types';

const PriorityFilter = () => {
  const dispatch = useDispatch();
  const selectedPriority = useSelector((state: RootState) => state.ticketFilters.priority);

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as TicketPriority;
    const newPriority = selectedPriority.includes(value)
      ? selectedPriority.filter((priority) => priority !== value)
      : [...selectedPriority, value];
    dispatch(setPriorityFilter(newPriority));
  };

  return (
    <div>
   
    </div>
  );
};

export default PriorityFilter;
