import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { StrictMode } from 'react';
import ReactQueryProvider from './app/ReactQueryProvider';


const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

const rootElement = createRoot(root);


rootElement.render(
    <StrictMode>
        <ReactQueryProvider>
            <App />
        </ReactQueryProvider>
    </StrictMode>
);