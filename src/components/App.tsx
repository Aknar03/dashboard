import { useState } from 'react'
import * as classes from './App.module.scss';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './UI/Navbar';
import AppRoutes from '../router/AppRouter';

const App = () => { 


    return (
        <BrowserRouter>
            <Navbar />
            <AppRoutes />
        </BrowserRouter>
    )
}

export default App