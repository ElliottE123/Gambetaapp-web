import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Contact from '../components/Contact';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const handlePageChange = (page: string) => {
    if (page === 'home') navigate('/');
    else navigate(`/${page}`);
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage="contact" onPageChange={handlePageChange} />
      <Contact />
    </div>
  );
};

export default ContactPage;
