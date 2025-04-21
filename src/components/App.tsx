// src/components/App.tsx
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../router/AppRouter';
import * as styles from './App.module.scss';

const App = () => {
  return (
    <BrowserRouter >
    {/* <main className={styles.main}> */}
        <AppRouter />
        {/* </main> */}
      
    </BrowserRouter>
  );
};

export default App;
