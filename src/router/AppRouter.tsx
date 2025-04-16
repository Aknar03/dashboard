import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import TicketStatsDisplay from '../pages/TicketStatsDisplay/TicketStatsDisplay';
import { Tickets } from '../pages/TicketList';
import { Stats } from 'webpack';

// Компонент маршрутов
const AppRoutes = () => (
    <Routes>
        <Route path="*" element={<div>Страница не найдена</div>} />

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
