// src/components/Layout.tsx
import React from 'react';
import Navbar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
