import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Tickets } from '../pages/TicketList';
import TicketStatsDisplay from '../pages/TicketStatsDisplay/TicketStatsDisplay';

// Компонент маршрутов
const AppRoutes = () => (
    <Routes>
        <Route path="*" element={<div>Страница не найдена</div>} />
        <Route path="/" element={<Navigate to='/ticketStats' />} />

        <Route
            path="/ticketList"
            element={
                <Suspense fallback="loading...">
                    <Tickets />
                </Suspense>
            }
        />
        <Route
            path="/ticketStats"
            element={
                <Suspense fallback="loading...">
                    <TicketStatsDisplay />
                </Suspense>
            }
        />

    </Routes>
);

export default AppRoutes;
