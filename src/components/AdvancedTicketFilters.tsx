import { useState } from 'react';

export interface AdvancedTicketFiltersProps {
  onApplyFilters: (startDate: string, endDate: string) => void;
}

const AdvancedTicketFilters: React.FC<AdvancedTicketFiltersProps> = ({ onApplyFilters }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);

  const handleApply = () => {
    onApplyFilters(startDate, endDate); // передаем даты родительскому компоненту
  };

  return (
    <div>
      <h3>Расширенные фильтры</h3>
      <label>
        Начальная дата:
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </label>
      <label>
        Конечная дата:
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </label>
      <button onClick={handleApply}>Применить</button>
    </div>
  );
};

export default AdvancedTicketFilters;
