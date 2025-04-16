import { useDispatch, useSelector } from 'react-redux';
import { setPriorityFilter } from '../store/ticketFiltersSlice';
import { RootState } from '../store/store';

const PriorityFilter = () => {
  const dispatch = useDispatch();
  const selectedPriority = useSelector((state: RootState) => state.ticketFilters.priority);

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'low' | 'medium' | 'high' | 'urgent';
    const newPriority = selectedPriority.includes(value)
      ? selectedPriority.filter((priority) => priority !== value)
      : [...selectedPriority, value];
    dispatch(setPriorityFilter(newPriority));
  };

  return (
    <div>
      <h3>Фильтр по приоритету</h3>
      <label>
        <input
          type="checkbox"
          value="low"
          checked={selectedPriority.includes('low')}
          onChange={handlePriorityChange}
        />
        Низкий
      </label>
      <label>
        <input
          type="checkbox"
          value="medium"
          checked={selectedPriority.includes('medium')}
          onChange={handlePriorityChange}
        />
        Средний
      </label>
      <label>
        <input
          type="checkbox"
          value="high"
          checked={selectedPriority.includes('high')}
          onChange={handlePriorityChange}
        />
        Высокий
      </label>
      <label>
        <input
          type="checkbox"
          value="urgent"
          checked={selectedPriority.includes('urgent')}
          onChange={handlePriorityChange}
        />
        Срочный
      </label>
    </div>
  );
};

export default PriorityFilter;
