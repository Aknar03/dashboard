import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './API/router/AppRouter';



const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

const rootElement = createRoot(root);


rootElement.render(
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
);