import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { LazyTicketList } from '../../pages/TicketList/TicketList.lazy';
import TicketStatsDisplay from '../../pages/TicketStatsDisplay/TicketStatsDisplay';
import App from '../../components/App';

// Компонент маршрутов
const AppRoutes = () => (
    <Routes>
        <Route
            path="ticketList"
            element={
                <Suspense fallback="loading...">
                    <LazyTicketList />
                </Suspense>
            }
        />
        <Route
            path="ticketStats"
            element={
                <Suspense fallback="loading...">
                    <TicketStatsDisplay />
                </Suspense>
            }
        />

    </Routes>
);

export default AppRoutes;
