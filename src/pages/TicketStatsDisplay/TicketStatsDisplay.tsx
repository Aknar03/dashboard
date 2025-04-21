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
    <>
    <h1>Dashboard</h1>
    <div className={styles.wrapper}>      
      <StatCard label="Открыто" value={data.open} color="#FFCDD2"/>
      <StatCard label="В обработке" value={data.inProgress} color="#FFF9C4"/>
      <StatCard label="Ожидают ответа" value={data.pendingClient} color="#BBDEFB"/>
      <StatCard label="Закрыто сегодня" value={data.closedToday} color="#C8E6C9"/>
    </div>
    </>
    
  );
};

const StatCard = ({ label, value, color }: { label: string; value: number; color?: string }) => {
  return (
    <div className={styles.card} style={{ backgroundColor: color }}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default TicketStatsDisplay;
