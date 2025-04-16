import { useQuery } from '@tanstack/react-query';
import { fetchTicketStats,  } from '../../API/mockApi';
import { TicketStats } from '../../API/types';

const TicketStatsDisplay = () => {
  const { data, isLoading, isError } = useQuery<TicketStats>({
    queryKey: ['ticketStats'],
    queryFn: () => fetchTicketStats(),
  });

  if (isLoading) return <p>Загрузка статистики...</p>;
  if (isError || !data) return <p>Ошибка при загрузке статистики</p>;

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <StatCard label="Открыто" value={data.open} />
      <StatCard label="В обработке" value={data.inProgress} />
      <StatCard label="Ожидают ответа" value={data.pendingClient} />
      <StatCard label="Закрыто сегодня" value={data.closedToday} />
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => {
  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        minWidth: '150px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{value}</div>
      <div style={{ fontSize: '0.9rem', color: '#555' }}>{label}</div>
    </div>
  );
};

export default TicketStatsDisplay;
