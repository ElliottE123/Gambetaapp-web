import Navigation from './components/Navigation';
import Home from './components/Home';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handlePageChange = (page: string) => {
    if (page === 'home') navigate('/');
    else navigate(`/${page}`);
  };

  const navigateToTournament = () => navigate('/tournament');
  const navigateToTournamentDetails = () => navigate('/tournament#details');

  return (
    <div className="min-h-screen">
      <Navigation currentPage={'home'} onPageChange={handlePageChange} />
      <Home 
        onNavigateToTournament={navigateToTournament}
        onNavigateToTournamentDetails={navigateToTournamentDetails}
      />
    </div>
  );
}

export default App;
