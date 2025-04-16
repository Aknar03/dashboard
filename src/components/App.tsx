import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../router/AppRouter';
import Navbar from './UI/Navbar';

const App = () => { 


    return (
        <BrowserRouter>
            <Navbar />
            <AppRoutes />
        </BrowserRouter>
    )
}

export default App