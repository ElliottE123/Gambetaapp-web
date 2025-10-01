import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Tournament from '../components/Tournament';

const TournamentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to hash targets with nav offset after mount/navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const navHeight = 80;
        const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        setTimeout(() => window.scrollTo({ top, behavior: 'smooth' }), 50);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location]);

  const handlePageChange = (page: string) => {
    if (page === 'home') navigate('/');
    else navigate(`/${page}`);
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage="tournament" onPageChange={handlePageChange} />
      <Tournament />
    </div>
  );
};

export default TournamentPage;
