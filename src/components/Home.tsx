import Hero from './Hero';
import TournamentAnnouncement from './TournamentAnnouncement';
import Footer from './Footer';

interface HomeProps {
  onNavigateToTournament: () => void;
  onNavigateToTournamentDetails?: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateToTournament, onNavigateToTournamentDetails }) => {
  return (
    <div>
      <Hero onNavigateToTournament={onNavigateToTournament} />
      <TournamentAnnouncement 
        onNavigateToTournament={onNavigateToTournament} 
        onNavigateToTournamentDetails={onNavigateToTournamentDetails}
      />
      <Footer />
    </div>
  );
};

export default Home;
