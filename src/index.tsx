import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App';
import { LazyTicketList } from './pages/TicketList/TicketList.lazy';
import TicketStatsDisplay from './pages/TicketStatsDisplay/TicketStatsDisplay';



const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

const rootElement = createRoot(root);

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/ticketList',
                element: <Suspense fallback={'loading...'}><LazyTicketList /></Suspense>,
            },
            {
                path: '/ticketStats',
                element: <Suspense fallback={'loading...'}><TicketStatsDisplay /></Suspense>,
            }
        ]
    },
])

rootElement.render(
    <RouterProvider router={router} />
);