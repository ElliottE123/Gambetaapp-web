import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import AboutUs from '../components/AboutUs';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const handlePageChange = (page: string) => {
    if (page === 'home') navigate('/');
    else navigate(`/${page}`);
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage="about" onPageChange={handlePageChange} />
      <AboutUs onNavigateToContact={() => handlePageChange('contact')} />
    </div>
  );
};

export default AboutPage;
