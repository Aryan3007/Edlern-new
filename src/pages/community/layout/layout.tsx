// import { useMediaQuery } from '@/hooks/useMediaQuery';
// import React, { useState, useEffect } from 'react';
import Header from '../comps/header';
// import Sidebar from './Sidebar';
// import SearchModal from '../modals/SearchModal';
// import CreateCommunityModal from '../modals/CreateCommunityModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  //   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  //   const [searchModalOpen, setSearchModalOpen] = useState(false);
  //   const [createCommunityModalOpen, setCreateCommunityModalOpen] = useState(false);
  //   const isMobile = useMediaQuery('(max-width: 768px)');

  // Auto-collapse sidebar on mobile
  //   useEffect(() => {
  //     if (isMobile) {
  //       setSidebarCollapsed(true);
  //     }
  //   }, [isMobile]);

  //   const toggleSidebar = () => {
  //     setSidebarCollapsed(!sidebarCollapsed);
  //   };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-2   bg-background">{children}</main>
    </div>
  );
};

export default Layout;