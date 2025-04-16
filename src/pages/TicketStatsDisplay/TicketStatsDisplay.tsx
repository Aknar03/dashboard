import { useQuery } from '@tanstack/react-query';
import { fetchTicketStats } from '../../API/mockApi';
import { TicketStats } from '../../API/types';
import * as styles from './TicketStatsDisplay.module.scss';

const TicketStatsDisplay = () => {
  const { data, isLoading, isError } = useQuery<TicketStats>({
    queryKey: ['ticketStats'],
    queryFn: () => fetchTicketStats(),
  });

  if (isLoading) return <p>Загрузка статистики...</p>;
  if (isError || !data) return <p>Ошибка при загрузке статистики</p>;

  return (
    <div className={styles.wrapper}>
      <StatCard label="Открыто" value={data.open} />
      <StatCard label="В обработке" value={data.inProgress} />
      <StatCard label="Ожидают ответа" value={data.pendingClient} />
      <StatCard label="Закрыто сегодня" value={data.closedToday} />
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className={styles.card}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default TicketStatsDisplay;
