// src/router/AppRouter.tsx
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/UI/Layout';
import { Tickets } from '../pages/TicketList';
import TicketStatsDisplay from '../pages/TicketStatsDisplay/TicketStatsDisplay';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/ticketStats" />} />
      <Route
        path="ticketList"
        element={
          <Suspense fallback="loading...">
            <Tickets />
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
      <Route path="*" element={<div>Страница не найдена</div>} />
    </Route>
  </Routes>
);

export default AppRouter;
