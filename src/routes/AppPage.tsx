import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import AppShowcase from '../components/AppShowcase';

const AppPage: React.FC = () => {
  const navigate = useNavigate();
  const handlePageChange = (page: string) => {
    if (page === 'home') navigate('/');
    else navigate(`/${page}`);
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage="app" onPageChange={handlePageChange} />
      <AppShowcase />
    </div>
  );
};

export default AppPage;
