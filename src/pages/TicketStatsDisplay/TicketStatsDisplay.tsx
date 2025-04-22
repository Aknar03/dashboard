import { useQuery } from '@tanstack/react-query';
import { fetchTicketStats } from '../../API/mockApi';
import { TicketStats } from '../../API/types';
import * as styles from './TicketStatsDisplay.module.scss';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';


const TicketStatsDisplay = () => {
  const { data, isLoading, isError } = useQuery<TicketStats>({
    queryKey: ['ticketStats'],
    queryFn: fetchTicketStats,
  });

  if (isLoading) return <p>Загрузка статистики...</p>;
  if (isError || !data) return <p>Ошибка при загрузке статистики</p>;

  const chartData = [
    { name: 'Открыто', value: data.open },
    { name: 'В обработке', value: data.inProgress },
    { name: 'Ожидают ответа', value: data.pendingClient },
    { name: 'Закрыто сегодня', value: data.closedToday },
  ];


  return (
    <>
    <h1>Dashboard</h1>
    <div className={styles.wrapper}>      
      <StatCard label="Открыто" value={data.open} color="#FFCDD2"/>
      <StatCard label="В обработке" value={data.inProgress} color="#FFF9C4"/>
      <StatCard label="Ожидают ответа" value={data.pendingClient} color="#BBDEFB"/>
      <StatCard label="Закрыто сегодня" value={data.closedToday} color="#C8E6C9"/>
    </div>
    <ResponsiveContainer width="100%" height={300}>
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis allowDecimals={false}/>
      <Tooltip />
      <Bar dataKey="value" fill="#42A5F5" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
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
