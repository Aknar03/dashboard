import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactQueryProvider from './app/ReactQueryProvider';
import ReduxProvider from './app/ReduxProvider';
import App from './components/App';
import './styles/global.scss';


const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

const rootElement = createRoot(root);


rootElement.render(
    <StrictMode>
        <ReduxProvider>
            <ReactQueryProvider>
                <App />
            </ReactQueryProvider>
        </ReduxProvider>
    </StrictMode>
);