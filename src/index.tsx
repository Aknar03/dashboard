import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App';
import { LazyTicketList } from './pages/TicketList/TicketList.lazy';
import TicketStatsDisplay from './pages/TicketStatsDisplay/TicketStatsDisplay';



const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

const rootElement = createRoot(root);

<Routes>
            <Route path="/" element={<App />}>
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
            </Route>
        </Routes>

rootElement.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);