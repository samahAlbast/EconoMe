// src/components/MainLayout.tsx
import React, { ReactNode } from 'react';
import Sidebar from './pages/sideBar/sidebar';
import './assets/mainLayout.css';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
